
from sqlalchemy.ext.asyncio import AsyncSession


from app.services.base import BaseService
from app.modules.opportunity.repository import OpportunityRepository
from app.modules.opportunity.schemas import (
    OpportunityCreate,
    OpportunityUpdate,
)
from sqlalchemy import select
from fastapi import HTTPException

from app.models.companies.company import Company
from app.models.internships.opportunity import Opportunity

class OpportunityService(BaseService):

    def __init__(self, db: AsyncSession):
        super().__init__(db)
        self.repository = OpportunityRepository()

    async def get_all(self):
        return await self.repository.get_all(self.db)

    async def get(self, opportunity_id):
        opportunity = await self.repository.get_by_id(
            self.db,
            opportunity_id,
        )

        if not opportunity:
            raise HTTPException(
                status_code=404,
                detail="Opportunity not found",
            )

        return opportunity

    async def create(self, data: OpportunityCreate):

        result = await self.db.execute(
            select(Company).where(Company.is_active == True)
        )

        company = result.scalars().first()

        if not company:
            raise HTTPException(
                status_code=404,
                detail="No active company found."
            )

        opportunity = Opportunity(
            company_id=company.id,
            title=data.project_title,
            description=data.role_description,
            status=data.opening_status.upper(),

            location=data.location,
            stipend=data.stipend,
            duration_weeks=data.duration_weeks,
            requirements=data.requirements,
            deadline=data.deadline,
        )

        self.db.add(opportunity)

        await self.commit_transaction()
        await self.db.refresh(opportunity)

        return opportunity

    async def update(
        self,
        opportunity_id,
        data: OpportunityUpdate,
    ):
        opportunity = await self.get(opportunity_id)

        opportunity = await self.repository.update(
            self.db,
            db_obj=opportunity,
            obj_in=data,
        )

        await self.commit_transaction()

        return opportunity

    async def delete(self, opportunity_id):
        await self.repository.delete(
            self.db,
            id=opportunity_id,
        )

        await self.commit_transaction()

        