import asyncio
from uuid import UUID
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
from app.core.config import settings
from app.models.rbac.role import Role
from app.models.rbac.role_permission import RolePermission
from app.models.rbac.permission import Permission
from app.models.rbac.feature import Feature
from app.models.rbac.module import Module

async def run():
    engine = create_async_engine(settings.DATABASE_URL)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as db:
        role_id = UUID("4cd42b20-a2a3-46f2-8be1-3819f654efb8") # HR
        
        role_modules_result = await db.execute(
            select(Feature.module_id)
            .select_from(RolePermission)
            .join(Permission, RolePermission.permission_id == Permission.id)
            .join(Feature, Permission.feature_id == Feature.id)
            .where(RolePermission.role_id == role_id)
        )
        module_ids = list({str(m) for m in role_modules_result.scalars().all()})
        print("HR Module IDs:", module_ids)

asyncio.run(run())
