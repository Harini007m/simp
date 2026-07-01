import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy import text
from app.core.config import settings

async def main():
    engine = create_async_engine(settings.DATABASE_URL)
    async with AsyncSession(engine) as session:
        result = await session.execute(text("SELECT username, email FROM auth_users WHERE email='admin@pinesphere.example.com'"))
        for row in result:
            print(row)
    await engine.dispose()

asyncio.run(main())
