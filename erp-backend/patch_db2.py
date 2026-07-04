import asyncio
from app.core.database import engine
from sqlalchemy import text

async def patch():
    async with engine.begin() as conn:
        try:
            await conn.execute(text("ALTER TABLE auth_users ADD COLUMN force_password_change BOOLEAN NOT NULL DEFAULT FALSE;"))
            print("Successfully patched database")
        except Exception as e:
            print("Error:", e)

asyncio.run(patch())
