import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from app.core.config import settings

async def run():
    engine = create_async_engine(settings.DATABASE_URL)
    async with engine.begin() as conn:
        try:
            await conn.execute(text("ALTER TABLE rbac_modules ADD COLUMN route_path VARCHAR(255);"))
            print("Added column successfully")
        except Exception as e:
            print(f"Error: {e}")

asyncio.run(run())
