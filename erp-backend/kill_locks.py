import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from app.core.config import settings

async def run():
    engine = create_async_engine(settings.DATABASE_URL)
    async with engine.begin() as conn:
        try:
            result = await conn.execute(text("SELECT pid, state FROM pg_stat_activity WHERE datname = 'simp_db' AND pid <> pg_backend_pid();"))
            pids = result.all()
            print("PIDs:", pids)
            for row in pids:
                pid, state = row
                if state != 'active':
                    print("Killing pid", pid, state)
                    await conn.execute(text(f"SELECT pg_terminate_backend({pid});"))
            print("Done killing locks")
        except Exception as e:
            print(f"Error: {e}")

asyncio.run(run())
