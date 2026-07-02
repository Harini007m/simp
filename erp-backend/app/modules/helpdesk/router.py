from fastapi import APIRouter, Depends, Request, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func, desc
from app.core.database import get_db
from app.core.responses import success_response
from app.models.support.helpdesk import Ticket, TicketMessage
from app.models.authentication.user import User
import uuid
import datetime

router = APIRouter()

# ---------- helpers ----------

async def _serialize_ticket(ticket: Ticket, db: AsyncSession) -> dict:
    """Convert a Ticket ORM object to the frontend-friendly dict."""
    # Fetch requester name
    requester = await db.get(User, ticket.requester_user_id)
    requester_name = requester.username if requester else "Unknown"

    # Fetch assignee name
    assignee_name = None
    if ticket.assigned_user_id:
        assignee = await db.get(User, ticket.assigned_user_id)
        assignee_name = assignee.username if assignee else None

    # Fetch messages
    msg_result = await db.execute(
        select(TicketMessage)
        .where(TicketMessage.ticket_id == ticket.id)
        .order_by(TicketMessage.created_at.asc())
    )
    messages = msg_result.scalars().all()
    comments = []
    for m in messages:
        sender = await db.get(User, m.sender_user_id)
        comments.append({
            "id": str(m.id),
            "ticketId": str(ticket.id),
            "authorId": str(m.sender_user_id),
            "authorName": sender.username if sender else "System",
            "content": m.message,
            "timestamp": m.created_at.isoformat() if m.created_at else "",
            "isInternal": False,
        })

    return {
        "id": str(ticket.id),
        "ticketNumber": ticket.ticket_number,
        "title": ticket.subject,
        "description": ticket.description,
        "category": ticket.category,
        "priority": ticket.priority,
        "status": ticket.status,
        "createdBy": str(ticket.requester_user_id),
        "creatorName": requester_name,
        "assignedTo": str(ticket.assigned_user_id) if ticket.assigned_user_id else None,
        "assigneeName": assignee_name,
        "department": ticket.department or "",
        "createdAt": ticket.created_at.isoformat() if ticket.created_at else "",
        "updatedAt": ticket.updated_at.isoformat() if ticket.updated_at else "",
        "resolvedAt": None,
        "slaBreach": False,
        "slaDueDate": "",
        "resolutionRemark": ticket.resolution_remark,
        "satisfactionStatus": ticket.satisfaction_status,
        "comments": comments,
    }


async def _next_ticket_number(db: AsyncSession) -> str:
    result = await db.execute(select(func.count(Ticket.id)))
    count = result.scalar() or 0
    return f"TK-{1001 + count}"


# Role hierarchy for forwarding (lowest → highest)
ROLE_HIERARCHY = ["Student", "Mentor", "Coordinator", "Admin", "Super Admin"]


# ---------- routes ----------

@router.get("/")
async def list_tickets(
    user_id: str = Query(None),
    db: AsyncSession = Depends(get_db),
):
    """List tickets. If user_id is provided, filter to that user's tickets."""
    query = select(Ticket).where(Ticket.deleted_at.is_(None)).order_by(desc(Ticket.updated_at))
    if user_id:
        try:
            uid = uuid.UUID(user_id)
            query = select(Ticket).where(
                Ticket.deleted_at.is_(None),
                (Ticket.requester_user_id == uid) | (Ticket.assigned_user_id == uid)
            ).order_by(desc(Ticket.updated_at))
        except ValueError:
            pass

    result = await db.execute(query)
    tickets = result.scalars().all()
    data = []
    for t in tickets:
        data.append(await _serialize_ticket(t, db))
    return success_response(data=data)


@router.get("/{ticket_id}")
async def get_ticket(ticket_id: str, db: AsyncSession = Depends(get_db)):
    """Get a single ticket by ID."""
    try:
        tid = uuid.UUID(ticket_id)
    except ValueError:
        return success_response(data=None, message="Invalid ticket ID")
    ticket = await db.get(Ticket, tid)
    if not ticket or ticket.deleted_at:
        return success_response(data=None, message="Ticket not found")
    data = await _serialize_ticket(ticket, db)
    return success_response(data=data)


@router.post("/")
async def create_ticket(request: Request, db: AsyncSession = Depends(get_db)):
    """Create a new ticket."""
    body = await request.json()
    ticket_number = await _next_ticket_number(db)

    requester_id_str = body.get("createdBy") or body.get("requester_user_id")
    if not requester_id_str:
        return success_response(data=None, message="requester user id is required")

    try:
        requester_uid = uuid.UUID(requester_id_str)
    except ValueError:
        return success_response(data=None, message="Invalid requester user id")

    ticket = Ticket(
        requester_user_id=requester_uid,
        ticket_number=ticket_number,
        subject=body.get("title") or body.get("subject", "No Subject"),
        description=body.get("description", ""),
        category=body.get("category", "General"),
        priority=body.get("priority", "Medium"),
        status="Open",
        department=body.get("department", ""),
        version_id=1,
    )
    db.add(ticket)
    await db.flush()

    data = await _serialize_ticket(ticket, db)
    return success_response(data=data, message="Ticket created")


@router.patch("/{ticket_id}")
async def update_ticket(ticket_id: str, request: Request, db: AsyncSession = Depends(get_db)):
    """Update ticket status, assignee, or satisfaction."""
    try:
        tid = uuid.UUID(ticket_id)
    except ValueError:
        return success_response(data=None, message="Invalid ticket ID")

    ticket = await db.get(Ticket, tid)
    if not ticket or ticket.deleted_at:
        return success_response(data=None, message="Ticket not found")

    body = await request.json()

    # Handle satisfaction response from requester
    if "satisfactionStatus" in body:
        sat = body["satisfactionStatus"]
        ticket.satisfaction_status = sat
        if sat == "satisfied":
            ticket.status = "Closed"
        elif sat == "not_satisfied":
            ticket.status = "Open"  # Re-open
            ticket.assigned_user_id = None
        ticket.version_id = (ticket.version_id or 1) + 1
        await db.flush()
        return success_response(data=await _serialize_ticket(ticket, db))

    # Handle resolve action (yes/no from assigned person)
    if "resolveAction" in body:
        action = body["resolveAction"]
        if action == "yes":
            ticket.status = "Resolved"
            ticket.resolution_remark = body.get("remark", "")
        elif action == "no":
            # Forward to next higher role — just unassign for now
            ticket.status = "Forwarded"
            ticket.assigned_user_id = None
        ticket.version_id = (ticket.version_id or 1) + 1
        await db.flush()
        return success_response(data=await _serialize_ticket(ticket, db))

    # Standard status / assignee update from management console
    if "status" in body:
        ticket.status = body["status"]
    if "assigneeId" in body:
        assignee_id = body["assigneeId"]
        if assignee_id:
            try:
                ticket.assigned_user_id = uuid.UUID(assignee_id)
            except ValueError:
                pass
        else:
            ticket.assigned_user_id = None
    if "assigneeName" in body:
        pass  # name is derived from the user record

    ticket.version_id = (ticket.version_id or 1) + 1
    await db.flush()
    data = await _serialize_ticket(ticket, db)
    return success_response(data=data, message="Ticket updated")


@router.post("/{ticket_id}/messages")
async def add_message(ticket_id: str, request: Request, db: AsyncSession = Depends(get_db)):
    """Add a reply / comment to a ticket."""
    try:
        tid = uuid.UUID(ticket_id)
    except ValueError:
        return success_response(data=None, message="Invalid ticket ID")

    ticket = await db.get(Ticket, tid)
    if not ticket or ticket.deleted_at:
        return success_response(data=None, message="Ticket not found")

    body = await request.json()
    sender_id_str = body.get("authorId") or body.get("sender_user_id")
    if not sender_id_str:
        return success_response(data=None, message="sender user id is required")

    try:
        sender_uid = uuid.UUID(sender_id_str)
    except ValueError:
        return success_response(data=None, message="Invalid sender user id")

    msg = TicketMessage(
        ticket_id=tid,
        sender_user_id=sender_uid,
        message=body.get("content") or body.get("message", ""),
        version_id=1,
    )
    db.add(msg)
    await db.flush()

    # Update ticket's updated_at
    ticket.version_id = (ticket.version_id or 1) + 1
    await db.flush()

    sender = await db.get(User, sender_uid)
    comment_data = {
        "id": str(msg.id),
        "ticketId": str(tid),
        "authorId": str(sender_uid),
        "authorName": sender.username if sender else "User",
        "content": msg.message,
        "timestamp": msg.created_at.isoformat() if msg.created_at else "",
        "isInternal": False,
    }
    return success_response(data=comment_data, message="Message added")
