import asyncio
import os
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
from dotenv import load_dotenv

load_dotenv()
db_url = os.getenv("DATABASE_URL")
engine = create_async_engine(db_url, echo=False)
async_session = sessionmaker(engine, expire_on_commit=False, class_=AsyncSession)

from app.models.rbac.user_role import UserRole
from app.models.rbac.role import Role

async def test():
    async with async_session() as session:
        result = await session.execute(
            select(UserRole.user_id, Role.id, Role.name)
            .join(Role, UserRole.role_id == Role.id)
        )
        for row in result:
            print(row)
        
asyncio.run(test())
