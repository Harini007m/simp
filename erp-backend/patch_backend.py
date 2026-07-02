import os

BASE_DIR = os.path.dirname(os.path.abspath(__file__))

MODULES = {
    "submission": """from fastapi import APIRouter
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
""",
    "performance": """from fastapi import APIRouter

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
""",
    "coordinator": """from fastapi import APIRouter

router = APIRouter()
mock_coordinators = [
    {
        "id": "c-1",
        "employeeId": "EMP-001",
        "collegeId": "COL-01",
        "name": "Jane Smith",
        "email": "jane@college.edu",
        "phone": "+1 555-1234",
        "assignedStudentsCount": 150,
        "activeBatchesCount": 4,
        "placementsCount": 45,
        "status": "Active"
    }
]

@router.get("/")
async def get_coordinators():
    return {"data": mock_coordinators}

@router.post("/")
async def create_coordinator(data: dict):
    new_id = f"c-{len(mock_coordinators)+1}"
    data["id"] = new_id
    mock_coordinators.append(data)
    return {"data": data}

mock_reports = {}

@router.get("/{id}/reports")
async def get_reports(id: str):
    return {"data": mock_reports.get(id, [])}

@router.post("/{id}/reports")
async def create_report(id: str, data: dict):
    if id not in mock_reports:
        mock_reports[id] = []
    mock_reports[id].append(data)
    return {"data": data}

@router.delete("/{id}")
async def delete_coordinator(id: str):
    global mock_coordinators
    mock_coordinators = [c for c in mock_coordinators if c["id"] != id]
    if id in mock_reports:
        del mock_reports[id]
    return {"status": "success"}
""",
    "fee": """from fastapi import APIRouter
from uuid import UUID

router = APIRouter()
mock_fees = {
    "f-1": {
        "id": "f-1",
        "feeName": "B.Tech CS - 2024",
        "feeType": "Training",
        "amount": 50000,
        "program": "B.Tech",
        "department": "CS",
        "duration": "4 Years",
        "applicableBatch": "2024-2028",
        "installments": 2,
        "lateFee": 0,
        "status": "Active"
    }
}

@router.get("/")
async def get_fees():
    return {"data": list(mock_fees.values())}

@router.post("/")
async def create_fee(data: dict):
    new_id = f"f-{len(mock_fees)+1}"
    data["id"] = new_id
    mock_fees[new_id] = data
    return {"data": data}

@router.delete("/{id}")
async def delete_fee(id: str):
    if id in mock_fees:
        del mock_fees[id]
    return {"status": "success"}
""",
    "billing": """from fastapi import APIRouter

router = APIRouter()
mock_invoices = []
mock_receipts = []

@router.get("/")
async def get_billing():
    return {"data": mock_invoices}

@router.post("/")
async def create_invoice(data: dict):
    new_id = f"inv-{len(mock_invoices)+1}"
    data["id"] = new_id
    mock_invoices.append(data)
    return {"data": data}
""",
    "wallet": """from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_wallet():
    return {"data": [
        {
            "id": "txn-1",
            "walletId": "W-ALL",
            "studentId": "STU-001",
            "studentName": "John Doe",
            "type": "Credit",
            "amount": 5000,
            "source": "Refund",
            "reference": "REF-12345",
            "status": "Completed",
            "date": "2026-07-01"
        },
        {
            "id": "txn-2",
            "walletId": "W-ALL",
            "studentId": "STU-002",
            "studentName": "Jane Smith",
            "type": "Debit",
            "amount": 1500,
            "source": "Fee Payment",
            "reference": "REF-67890",
            "status": "Completed",
            "date": "2026-07-02"
        }
    ]}
""",
    "finance": """from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_finance():
    return {"data": {
        "todaysCollection": 150000,
        "monthlyRevenue": 4500000,
        "pendingPayments": 120000,
        "totalTransactions": 3450,
        "refundRequests": 12,
        "walletBalance": 850000,
        "revenueGrowth": 14.5
    }}
""",
    "finance_analytics": """from fastapi import APIRouter

router = APIRouter()

@router.get("/")
async def get_analytics():
    return {"data": {
        "totalRealizedRevenue": 1500000,
        "paymentMethodDistribution": [
            {"method": "UPI", "amount": 800000},
            {"method": "Credit Card", "amount": 400000},
            {"method": "Bank Transfer", "amount": 300000}
        ],
        "transactionSuccessRate": [
            {"status": "Success", "count": 1250},
            {"status": "Failed", "count": 45},
            {"status": "Pending", "count": 12}
        ]
    }}
"""
}

def patch():
    for mod, content in MODULES.items():
        path = os.path.join(BASE_DIR, "app", "modules", mod, "router.py")
        if os.path.exists(path):
            with open(path, "w") as f:
                f.write(content)
            print(f"Patched {mod}/router.py")
        else:
            print(f"Directory {mod} not found!")

if __name__ == "__main__":
    patch()
