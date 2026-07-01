from uuid import UUID

from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession

from app.core.database import get_db
# NOTE: endpoints return raw Pydantic models (not wrapped)

from app.modules.opportunity.service import OpportunityService
from app.modules.opportunity.schemas import (
    OpportunityCreate,
    OpportunityUpdate,
    OpportunityResponse,
)

router = APIRouter()


@router.get("/")
async def get_opportunities(
    db: AsyncSession = Depends(get_db),
):
    service = OpportunityService(db)

    opportunities = await service.get_all()

    # Return raw list of opportunity objects (not wrapped), to match frontend expectations
    return [OpportunityResponse.model_validate(o) for o in opportunities]


@router.get("/{opportunity_id}")
async def get_opportunity(
    opportunity_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = OpportunityService(db)

    opportunity = await service.get(opportunity_id)

    return OpportunityResponse.model_validate(opportunity)


@router.post("/")
async def create_opportunity(
    data: OpportunityCreate,
    db: AsyncSession = Depends(get_db),
):
    service = OpportunityService(db)

    opportunity = await service.create(data)

    return OpportunityResponse.model_validate(opportunity)


@router.put("/{opportunity_id}")
async def update_opportunity(
    opportunity_id: UUID,
    data: OpportunityUpdate,
    db: AsyncSession = Depends(get_db),
):
    service = OpportunityService(db)

    opportunity = await service.update(
        opportunity_id,
        data,
    )

    return OpportunityResponse.model_validate(opportunity)


@router.delete("/{opportunity_id}")
async def delete_opportunity(
    opportunity_id: UUID,
    db: AsyncSession = Depends(get_db),
):
    service = OpportunityService(db)

    await service.delete(opportunity_id)

    return success_response(
        message="Opportunity deleted successfully",
    )