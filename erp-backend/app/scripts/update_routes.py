import asyncio
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import text
import os
from dotenv import load_dotenv

load_dotenv()
DATABASE_URL = os.getenv("DATABASE_URL")
if DATABASE_URL and DATABASE_URL.startswith("postgresql://"):
    DATABASE_URL = DATABASE_URL.replace("postgresql://", "postgresql+asyncpg://", 1)

engine = create_async_engine(DATABASE_URL, echo=False)
AsyncSessionLocal = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)

async def update_routes():
    routes = {
        "dashboard": "/feature",
        "users": "/feature/users",
        "roles": "/feature/roles",
        "modules": "/feature/modules",
        "security": "/feature/security",
        "organization": "/feature/organization",
        "program": "/feature/program",
        "batch": "/feature/batch",
        "student": "/feature/student",
        "mentor": "/feature/mentor/profile",
        "lms": "/feature/lms",
        "attendance": "/feature/attendance",
        "task": "/feature/task",
        "assessment": "/feature/assessment",
        "submission": "/feature/submissions",
        "performance": "/feature/performance",
        "communication": "/feature/communication",
        "notification": "/feature/notifications",
        "calendar": "/feature/calendar",
        "email": "/feature/email",
        "certificate": "/feature/certificates",
        "document": "/feature/documents",
        "placement": "/feature/placement",
        "alumni": "/feature/alumni",
        "analytics": "/feature/analytics",
        "reports": "/feature/reports",
        "helpdesk": "/feature/helpdesk",
        "idcard": "/feature/id-card",
        "selfservice": "/feature/self-service",
        "productivity": "/feature/productivity"
    }

    async with AsyncSessionLocal() as session:
        for code, route in routes.items():
            await session.execute(
                text("UPDATE rbac_modules SET route_path = :route WHERE code = :code"),
                {"route": route, "code": code}
            )
        await session.commit()
        print("Updated route paths successfully.")

if __name__ == "__main__":
    asyncio.run(update_routes())
