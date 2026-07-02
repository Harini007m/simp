from fastapi import APIRouter
from typing import Dict
from uuid import UUID

router = APIRouter()

mock_submissions = {
    "123e4567-e89b-12d3-a456-426614174000": {
        "id": "123e4567-e89b-12d3-a456-426614174000",
        "studentId": "STU-001",
        "taskId": "task-xyz",
        "assessmentId": "assm-999",
        "status": "PENDING",
        "repoLink": "https://github.com/miles-spidee/simp",
        "liveLink": "https://simp.pinesphere.com",
        "subtasks": [
            {"id": "st1", "phase": 1, "task": "Initial Setup", "completed": True},
            {"id": "st2", "phase": 1, "task": "Database Schema", "completed": True},
            {"id": "st3", "phase": 2, "task": "API Integration", "completed": False}
        ],
        "commits": [
            {"commit": "a1b2c3d", "message": "Initial commit", "author": "Student", "date": "2026-07-01", "guideComment": "Good start"},
            {"commit": "e4f5g6h", "message": "Add API integration", "author": "Student", "date": "2026-07-02", "guideComment": None}
        ],
        "marksObtained": None,
        "fileIds": ["file-xyz123", "file-abc456"]
    }
}

@router.get("/")
async def get_submissions():
    return list(mock_submissions.values())

@router.get("/{id}")
async def get_submission(id: str):
    return mock_submissions.get(id)

@router.post("/")
async def create_submission(data: dict):
    new_id = f"sub-{len(mock_submissions)+1}"
    data["id"] = new_id
    mock_submissions[new_id] = data
    return data

@router.patch("/{id}")
async def update_submission(id: str, updates: dict):
    if id in mock_submissions:
        mock_submissions[id].update(updates)
        return mock_submissions[id]
    return None
