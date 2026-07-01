import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select, func
from app.core.config import settings
from app.models.rbac.module import Module
from app.models.rbac.feature import Feature
from app.models.rbac.permission import Permission
from app.models.rbac.role_permission import RolePermission

async def run():
    engine = create_async_engine(settings.DATABASE_URL)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as db:
        modules = await db.execute(select(func.count(Module.id)))
        print("Modules:", modules.scalar())
        
        features = await db.execute(select(func.count(Feature.id)))
        print("Features:", features.scalar())
        
        permissions = await db.execute(select(func.count(Permission.id)))
        print("Permissions:", permissions.scalar())
        
        rps = await db.execute(select(func.count(RolePermission.role_id)))
        print("RolePermissions:", rps.scalar())

asyncio.run(run())
