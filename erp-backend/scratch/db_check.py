import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, async_sessionmaker
from sqlalchemy import text
from app.core.config import settings

async def main():
    engine = create_async_engine(settings.DATABASE_URL)
    async with engine.connect() as conn:
        print("Checking prod_personal_tasks:")
        try:
            res = await conn.execute(text("SELECT id, title, completed, user_id FROM prod_personal_tasks;"))
            print("Tasks:", res.all())
        except Exception as e:
            print("Error tasks:", e)

        print("\nChecking prod_sticky_notes:")
        try:
            res = await conn.execute(text("SELECT id, content, color, user_id FROM prod_sticky_notes;"))
            print("Notes:", res.all())
        except Exception as e:
            print("Error notes:", e)

        print("\nChecking prod_bookmarks:")
        try:
            res = await conn.execute(text("SELECT id, title, url, user_id FROM prod_bookmarks;"))
            print("Bookmarks:", res.all())
        except Exception as e:
            print("Error bookmarks:", e)

asyncio.run(main())
