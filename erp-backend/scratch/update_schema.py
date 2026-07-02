import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from app.core.config import settings

async def main():
    engine = create_async_engine(settings.DATABASE_URL)
    async with engine.begin() as conn:
        try:
            print("Altering sup_tickets table...")
            await conn.execute(text("ALTER TABLE sup_tickets ADD COLUMN IF NOT EXISTS ticket_number VARCHAR(50) UNIQUE;"))
            await conn.execute(text("ALTER TABLE sup_tickets ADD COLUMN IF NOT EXISTS department VARCHAR(100);"))
            await conn.execute(text("ALTER TABLE sup_tickets ADD COLUMN IF NOT EXISTS resolution_remark TEXT;"))
            await conn.execute(text("ALTER TABLE sup_tickets ADD COLUMN IF NOT EXISTS satisfaction_status VARCHAR(50);"))
            print("Successfully altered sup_tickets schema!")
        except Exception as e:
            print("Error altering table:", e)

asyncio.run(main())
