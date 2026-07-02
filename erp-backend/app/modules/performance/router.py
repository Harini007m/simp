from fastapi import APIRouter

router = APIRouter()

@router.get("/students")
async def get_performance_students():
    return []

@router.get("/batches")
async def get_performance_batches():
    return []

@router.get("/students/{studentId}")
async def get_performance_student(studentId: str):
    return None
