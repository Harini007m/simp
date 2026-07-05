import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from app.core.config import settings

async def main():
    engine = create_async_engine(settings.DATABASE_URL)
    async with engine.connect() as conn:
        print("Checking acad_programs:")
        try:
            res = await conn.execute(text("SELECT id, name, code, program_type, deleted_at FROM acad_programs;"))
            for r in res.all():
                print(r)
        except Exception as e:
            print("Error acad_programs:", e)

asyncio.run(main())
