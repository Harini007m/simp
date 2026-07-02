import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from app.core.config import settings

async def main():
    engine = create_async_engine(settings.DATABASE_URL)
    async with engine.begin() as conn:
        try:
            # Select all tickets with NULL ticket_number
            res = await conn.execute(text("SELECT id FROM sup_tickets WHERE ticket_number IS NULL;"))
            rows = res.all()
            for idx, row in enumerate(rows):
                tid = row[0]
                t_num = f"TK-{1001 + idx}"
                await conn.execute(text("UPDATE sup_tickets SET ticket_number = :t_num WHERE id = :tid;"), {"t_num": t_num, "tid": tid})
            print(f"Successfully backfilled {len(rows)} ticket_numbers!")
        except Exception as e:
            print("Error backfilling:", e)

asyncio.run(main())
