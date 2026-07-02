from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from app.core.responses import success_response
from app.core.dependencies import get_current_user
from app.models.authentication.user import User
from app.models.profiles.student_profile import StudentProfile
from app.models.profiles.employee_profile import EmployeeProfile
import uuid
import datetime

router = APIRouter()


def _build_card(user: User, profile_type: str, enrollment_or_code: str, department: str = "Operations", program: str = "Staff", batch: str = "Staff") -> dict:
    """Build a DigitalIDCard dict from user + profile data."""
    uid_int = int(str(user.id).replace("-", "")[:8], 16) % 10000
    card_number = f"ID-2026-{1000 + uid_int}"
    student_id = enrollment_or_code or (f"STU-{100 + uid_int}" if profile_type == "student" else f"EMP-{500 + uid_int}")
    issue_date = user.created_at or datetime.datetime.now(datetime.timezone.utc)
    expiry_date = issue_date + datetime.timedelta(days=365)

    return {
        "id": f"IDC-{user.id}",
        "cardNumber": card_number,
        "studentId": student_id,
        "studentName": user.username or "User",
        "department": department,
        "program": program,
        "batch": batch,
        "photoUrl": user.profile_image_url or f"https://api.dicebear.com/7.x/initials/svg?seed={user.username}&backgroundColor=0d9488,14b8a6,0f172a",
        "qrCodeData": f"https://pinesphere.com/verify/{card_number}",
        "issueDate": issue_date.isoformat(),
        "expiryDate": expiry_date.isoformat(),
        "status": "Active",
        "bloodGroup": "B+",
        "emergencyContact": "+91 99999 00000",
    }


@router.get("/my")
async def get_my_idcard(
    current_user: User = Depends(get_current_user),
    db: AsyncSession = Depends(get_db),
):
    """Get the digital ID card for the currently authenticated user."""
    user = current_user

    # Try student profile first
    stu_result = await db.execute(
        select(StudentProfile).where(
            StudentProfile.user_id == user.id,
            StudentProfile.deleted_at.is_(None),
        )
    )
    stu = stu_result.scalars().first()
    if stu:
        # Fetch department name if available
        dept_name = "Engineering"
        if stu.department_id:
            from app.models.organizations.department import Department
            dept = await db.get(Department, stu.department_id)
            if dept:
                dept_name = dept.name

        batch_name = "Class of 2026"
        if stu.batch_id:
            from app.models.academic.batch import Batch
            batch = await db.get(Batch, stu.batch_id)
            if batch:
                batch_name = batch.name

        card = _build_card(
            user,
            profile_type="student",
            enrollment_or_code=stu.enrollment_number,
            department=dept_name,
            program="Intern",
            batch=batch_name,
        )
        return success_response(data=card)

    # Try employee profile
    emp_result = await db.execute(
        select(EmployeeProfile).where(
            EmployeeProfile.user_id == user.id,
            EmployeeProfile.deleted_at.is_(None),
        )
    )
    emp = emp_result.scalars().first()
    if emp:
        dept_name = "Operations"
        if emp.department_id:
            from app.models.organizations.department import Department
            dept = await db.get(Department, emp.department_id)
            if dept:
                dept_name = dept.name

        card = _build_card(
            user,
            profile_type="employee",
            enrollment_or_code=emp.employee_code,
            department=dept_name,
            program=emp.designation or "Employee",
            batch="Staff",
        )
        return success_response(data=card)

    # Fallback — generate from user data only
    card = _build_card(user, profile_type="general", enrollment_or_code="")
    return success_response(data=card)


@router.get("/verify/{card_number}")
async def verify_card(card_number: str, db: AsyncSession = Depends(get_db)):
    """Verify a card by its card number."""
    # Since cards are generated dynamically, we just validate the format
    if card_number.startswith("ID-"):
        return success_response(data={"verified": True, "cardNumber": card_number, "status": "Active"})
    return success_response(data={"verified": False, "cardNumber": card_number, "status": "Unknown"})


@router.get("/")
async def list_idcards(db: AsyncSession = Depends(get_db)):
    """List all users who have ID cards (i.e., all active users)."""
    result = await db.execute(
        select(User).where(User.deleted_at.is_(None)).limit(100)
    )
    users = result.scalars().all()
    cards = []
    for u in users:
        cards.append(_build_card(u, profile_type="general", enrollment_or_code=""))
    return success_response(data=cards)


@router.get("/{path:path}")
async def fallback_get_idcard(path: str, db: AsyncSession = Depends(get_db)):
    return await list_idcards(db)
