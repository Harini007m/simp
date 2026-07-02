from __future__ import annotations

from datetime import date
from typing import Optional
from uuid import UUID

from pydantic import BaseModel, Field


# ------------------------------------------------------------------
# Create
# ------------------------------------------------------------------

class BatchCreate(BaseModel):
    program_id: UUID
    semester_id: Optional[UUID] = None

    name: str = Field(..., max_length=255)
    code: str = Field(..., max_length=100)

    start_date: date
    end_date: date

    max_capacity: int = Field(..., gt=0)


# ------------------------------------------------------------------
# Update
# ------------------------------------------------------------------

class BatchUpdate(BaseModel):
    program_id: Optional[UUID] = None
    semester_id: Optional[UUID] = None

    name: Optional[str] = Field(None, max_length=255)
    code: Optional[str] = Field(None, max_length=100)

    start_date: Optional[date] = None
    end_date: Optional[date] = None

    max_capacity: Optional[int] = Field(None, gt=0)


# ------------------------------------------------------------------
# Response
# ------------------------------------------------------------------

class BatchResponse(BaseModel):
    batch_id: UUID

    program_id: UUID
    semester_id: Optional[UUID]

    batch_name: str
    batch_code: str

    start_date: date
    end_date: date

    max_capacity: int

    created_at: str
    updated_at: str

    class Config:
        from_attributes = True