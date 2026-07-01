import asyncio
from fastapi.testclient import TestClient
from app.main import app
from app.core.dependencies import get_current_user
from app.models.authentication.user import User
from uuid import uuid4

# We'll monkeypatch PermissionRepository.user_has_permission
from app.modules.identity.repository import PermissionRepository

original_user_has_permission = PermissionRepository.user_has_permission

async def mock_has_permission(self, db, user_id, permission_name):
    return True

PermissionRepository.user_has_permission = mock_has_permission

mock_user = User(
    id=uuid4(),
    email="test@example.com",
    username="testuser",
    account_status="ACTIVE"
)

app.dependency_overrides[get_current_user] = lambda: mock_user

client = TestClient(app)

def run_test():
    payload = {
        "name": "Test Role 5",
        "code": "TEST_ROLE_5",
        "description": "Test role 5",
        "is_system": False,
        "module_ids": []
    }
    print("Sending POST request to /api/v1/rbac/roles...")
    response = client.post("/api/v1/rbac/roles", json=payload)
    print(f"Status: {response.status_code}")
    print(f"Response: {response.text}")

if __name__ == "__main__":
    run_test()

