import asyncio
from fastapi.testclient import TestClient
from app.main import app
from app.core.dependencies import get_current_user, require_permission
from app.core.database import get_db
from app.models.authentication.user import User
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
# Because require_permission returns a nested function, overriding it directly is tricky.
# Wait, require_permission returns `checker`. We can override it by mapping the exact result.
# Let's just override `get_current_user` and also monkey-patch `PermissionRepository.user_has_permission`.

original_user_has_permission = PermissionRepository.user_has_permission
async def mock_has_permission(self, db, user_id, permission_name):
    return True
PermissionRepository.user_has_permission = mock_has_permission

client = TestClient(app)

def run_test():
    payload = {
        "name": "Test Role 6",
        "code": "TEST_ROLE_6",
        "description": "Test role 6",
        "is_system": False,
        "module_ids": []
    }
    print("Sending POST request to /api/v1/rbac/roles...")
    response = client.post("/api/v1/rbac/roles", json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")

if __name__ == "__main__":
    run_test()

