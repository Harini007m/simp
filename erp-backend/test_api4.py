import asyncio
from fastapi.testclient import TestClient
from app.main import app
from app.core.dependencies import get_current_user
from app.core.database import get_db
from app.models.authentication.user import User
from app.models.rbac.module import Module
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from sqlalchemy import select
from app.core.config import settings
from app.modules.identity.repository import PermissionRepository

# Patch the require_permission checker to return a real user!
async def mock_checker():
    engine = create_async_engine(settings.DATABASE_URL)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    async with async_session() as db:
        result = await db.execute(select(User).limit(1))
        return result.scalars().first()

app.dependency_overrides[get_current_user] = mock_checker

original_user_has_permission = PermissionRepository.user_has_permission
async def mock_has_permission(self, db, user_id, permission_name):
    return True
PermissionRepository.user_has_permission = mock_has_permission

client = TestClient(app)

async def get_real_module_id():
    engine = create_async_engine(settings.DATABASE_URL)
    async_session = sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)
    async with async_session() as db:
        result = await db.execute(select(Module.id).limit(1))
        return str(result.scalars().first())

def run_test():
    loop = asyncio.get_event_loop()
    mod_id = loop.run_until_complete(get_real_module_id())
    
    payload = {
        "name": "Test Role 7",
        "code": "TEST_ROLE_7",
        "description": "Test role 7",
        "is_system": False,
        "module_ids": [mod_id]
    }
    print(f"Sending POST request to /api/v1/rbac/roles with module_id={mod_id}...")
    response = client.post("/api/v1/rbac/roles", json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")

if __name__ == "__main__":
    run_test()

