import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
from app.core.config import settings
from app.models.rbac.role import Role
from app.models.rbac.module import Module
from app.modules.rbac.schemas import RoleCreate
from app.modules.rbac.service import RoleService
from uuid import uuid4

async def test():
    engine = create_async_engine(settings.DATABASE_URL)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as db:
        service = RoleService(db)
        print("Testing create and assign_modules...")
        
        user_id = uuid4() # this might throw FK on audit mixin? Let's hope soft FK
        
        # Get a module id
        result = await db.execute(select(Module.id).limit(1))
        mod = result.scalars().first()
        if not mod:
            print("No modules found")
            return
            
        role_create = RoleCreate(name="Test Role", code=f"TEST_{uuid4().hex[:6].upper()}", description="test", is_system=False)
        try:
            role = await service.create(obj_in=role_create, user_id=user_id)
            print(f"Created role {role.id}")
            
            await service.assign_modules(role.id, [mod], user_id)
            print("Success!")
        except Exception as e:
            print(f"Error: {e}")
            import traceback
            traceback.print_exc()

if __name__ == "__main__":
    asyncio.run(test())
