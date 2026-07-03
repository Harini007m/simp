import asyncio
from sqlalchemy.ext.asyncio import create_async_engine
from sqlalchemy import text
from app.core.config import settings

async def main():
    engine = create_async_engine(settings.DATABASE_URL)
    async with engine.connect() as conn:
        print("Checking sup_tickets:")
        try:
            res = await conn.execute(text("SELECT id, ticket_number, subject, status, requester_user_id FROM sup_tickets;"))
            print("Tickets:", res.all())
        except Exception as e:
            print("Error tickets:", e)

asyncio.run(main())
