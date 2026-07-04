import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text

DATABASE_URL = "postgresql+asyncpg://postgres:postgres@localhost:5432/pinesphere_erp"
# Note: I am using 'pinesphere_erp' based on app/core/config.py

async def patch():
    engine = create_async_engine(DATABASE_URL)
    async with engine.begin() as conn:
        try:
            await conn.execute(text("ALTER TABLE auth_users ADD COLUMN force_password_change BOOLEAN NOT NULL DEFAULT FALSE;"))
            print("Successfully patched database (pinesphere_erp)")
            return True
        except Exception as e:
            print("Error with pinesphere_erp:", e)
            return False

async def patch_alt():
    DATABASE_URL_ALT = "postgresql+asyncpg://postgres:postgres@localhost:5432/simp_db"
    engine = create_async_engine(DATABASE_URL_ALT)
    async with engine.begin() as conn:
        try:
            await conn.execute(text("ALTER TABLE auth_users ADD COLUMN force_password_change BOOLEAN NOT NULL DEFAULT FALSE;"))
            print("Successfully patched database (simp_db)")
        except Exception as e:
            print("Error with simp_db:", e)

async def main():
    success = await patch()
    if not success:
        await patch_alt()

asyncio.run(main())
