from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
from app.core.dependencies import require_permission
from app.core.responses import APIResponse, success_response

from app.models.authentication.user import User
from app.modules.batch.schemas import (
    BatchCreate,
    BatchUpdate,
    BatchResponse,
)
from app.modules.batch.service import BatchService

router = APIRouter()


@router.get("/", response_model=APIResponse[list[BatchResponse]])
async def get_batches(
    current_user: User = Depends(require_permission("batch", "read")),
    db: AsyncSession = Depends(get_db),
):
    service = BatchService(db)

    batches = await service.get_multi()

    data = [
        BatchResponse(
            batch_id=batch.id,
            program_id=batch.program_id,
            semester_id=batch.semester_id,
            batch_name=batch.name,
            batch_code=batch.code,
            start_date=batch.start_date,
            end_date=batch.end_date,
            max_capacity=batch.max_capacity,
            created_at=batch.created_at.isoformat() if batch.created_at else "",
            updated_at=batch.updated_at.isoformat() if batch.updated_at else "",
        )
        for batch in batches
    ]

    return success_response(data=data)


@router.get("/{batch_id}", response_model=APIResponse[BatchResponse])
async def get_batch(
    batch_id: UUID,
    current_user: User = Depends(require_permission("batch", "read")),
    db: AsyncSession = Depends(get_db),
):
    service = BatchService(db)

    batch = await service.get(batch_id)

    response = BatchResponse(
        batch_id=batch.id,
        program_id=batch.program_id,
        semester_id=batch.semester_id,
        batch_name=batch.name,
        batch_code=batch.code,
        start_date=batch.start_date,
        end_date=batch.end_date,
        max_capacity=batch.max_capacity,
        created_at=batch.created_at.isoformat() if batch.created_at else "",
        updated_at=batch.updated_at.isoformat() if batch.updated_at else "",
    )

    return success_response(data=response)


@router.post("/", response_model=APIResponse[BatchResponse])
async def create_batch(
    payload: BatchCreate,
    current_user: User = Depends(require_permission("batch", "create")),
    db: AsyncSession = Depends(get_db),
):
    service = BatchService(db)

    batch = await service.create(
        obj_in=payload,
        user_id=current_user.id,
    )

    response = BatchResponse(
        batch_id=batch.id,
        program_id=batch.program_id,
        semester_id=batch.semester_id,
        batch_name=batch.name,
        batch_code=batch.code,
        start_date=batch.start_date,
        end_date=batch.end_date,
        max_capacity=batch.max_capacity,
        created_at=batch.created_at.isoformat() if batch.created_at else "",
        updated_at=batch.updated_at.isoformat() if batch.updated_at else "",
    )

    return success_response(
        data=response,
        message="Batch created successfully",
    )


@router.put("/{batch_id}", response_model=APIResponse[BatchResponse])
async def update_batch(
    batch_id: UUID,
    payload: BatchUpdate,
    current_user: User = Depends(require_permission("batch", "update")),
    db: AsyncSession = Depends(get_db),
):
    service = BatchService(db)

    batch = await service.update(
        id=batch_id,
        obj_in=payload,
        user_id=current_user.id,
    )

    response = BatchResponse(
        batch_id=batch.id,
        program_id=batch.program_id,
        semester_id=batch.semester_id,
        batch_name=batch.name,
        batch_code=batch.code,
        start_date=batch.start_date,
        end_date=batch.end_date,
        max_capacity=batch.max_capacity,
        created_at=batch.created_at.isoformat() if batch.created_at else "",
        updated_at=batch.updated_at.isoformat() if batch.updated_at else "",
    )

    return success_response(
        data=response,
        message="Batch updated successfully",
    )


@router.delete("/{batch_id}", response_model=APIResponse[dict])
async def delete_batch(
    batch_id: UUID,
    current_user: User = Depends(require_permission("batch", "delete")),
    db: AsyncSession = Depends(get_db),
):
    service = BatchService(db)

    await service.delete(
        id=batch_id,
        user_id=current_user.id,
    )

    return success_response(
        data={},
        message="Batch deleted successfully",
    )