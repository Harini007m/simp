import asyncio
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
        role_modules_result = await db.execute(
            select(RolePermission.role_id, Feature.module_id)
            .join(Permission, RolePermission.permission_id == Permission.id)
            .join(Feature, Permission.feature_id == Feature.id)
        )
        
        role_modules = {}
        for row in role_modules_result:
            r_id = row[0]
            m_id = row[1]
            if r_id not in role_modules:
                role_modules[r_id] = set()
            role_modules[r_id].add(str(m_id))
            
        print("Role Modules:", role_modules)

asyncio.run(run())
