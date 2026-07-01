import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
from app.core.config import settings
from app.models.authentication.user import User
from app.modules.rbac.router import create_role
from app.modules.rbac.schemas import RoleCreateWithModules

async def run():
    engine = create_async_engine(settings.DATABASE_URL)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as db:
        # Get super admin user
        result = await db.execute(select(User).filter(User.email == 'bob@mail.com'))
        user = result.scalars().first()
        
        data = RoleCreateWithModules(
            name="test",
            code="test",
            description="test",
            is_system=False,
            module_ids=[]
        )
        
        try:
            # Test directly
            response = await create_role(data=data, current_user=user, db=db)
            print("SUCCESS", response)
        except Exception as e:
            print("EXCEPTION:", type(e), str(e))
            if hasattr(e, 'status_code'):
                print("STATUS:", e.status_code)
            if hasattr(e, 'detail'):
                print("DETAIL:", e.detail)

asyncio.run(run())
