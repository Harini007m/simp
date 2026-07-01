import asyncio
from uuid import UUID
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
from app.core.config import settings
from app.models.authentication.user import User
from app.core.schemas import SearchParams
from app.modules.rbac.router import search_roles

async def run():
    engine = create_async_engine(settings.DATABASE_URL)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    
    async with async_session() as db:
        # Get super admin user
        result = await db.execute(select(User).filter(User.email == 'bob@mail.com'))
        user = result.scalars().first()
        
        params = SearchParams(page=1, page_size=10)
        
        # Test directly
        response = await search_roles(params=params, current_user=user, db=db)
        
        import json
        print(json.dumps(response.body.decode('utf-8'), indent=2))

asyncio.run(run())
