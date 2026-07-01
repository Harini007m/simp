from fastapi import APIRouter, Depends, Body
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from app.core.database import get_db
from uuid import uuid4

from app.models.academic.program import Program

router = APIRouter()


@router.get("/")
async def get_program_list(db: AsyncSession = Depends(get_db)):
    # DB-backed listing: map Program model to frontend API shape
    result = await db.execute(select(Program).order_by(Program.created_at.desc()))
    progs = result.scalars().all()

    def map_prog(p: Program):
        return {
            "program_id": str(getattr(p, 'id', '')),
            "internship_type_id": getattr(p, 'program_type', '') or '',
            "program_code": getattr(p, 'code', ''),
            "program_name": getattr(p, 'name', ''),
            "program_description": getattr(p, 'description', '') or '',
            "duration_weeks": (getattr(p, 'duration_months', 0) or 0) * 4,
            "certificate_available": False,
            "status": "Active",
        }

    return [map_prog(p) for p in progs]


@router.post("/", status_code=201)
async def create_program(payload: dict = Body(...), db: AsyncSession = Depends(get_db)):
    """
    Temporary endpoint: accept program create payload and return created object
    with a generated `program_id`. Replace with repository-backed creation later.
    """
    program_id = str(uuid4())
    # echo back the payload with program_id to match frontend `ProgramResponse` shape
    response = {"program_id": program_id, **payload}
    return response
