import asyncio
import os
from dotenv import load_dotenv
load_dotenv()
from sqlalchemy import text
from app.core.database import engine

async def patch_db():
    async with engine.begin() as conn:
        try:
            print("Dropping NOT NULL on profile_students.user_id...")
            await conn.execute(text("ALTER TABLE profile_students ALTER COLUMN user_id DROP NOT NULL;"))
            print("Success")
        except Exception as e:
            print(f"Skipped profile_students: {e}")
            
        try:
            print("Adding user_id to org_organizations...")
            await conn.execute(text("ALTER TABLE org_organizations ADD COLUMN user_id UUID UNIQUE REFERENCES auth_users(id) ON DELETE SET NULL;"))
            print("Success")
        except Exception as e:
            print(f"Skipped org_organizations: {e}")
            
if __name__ == "__main__":
    asyncio.run(patch_db())
