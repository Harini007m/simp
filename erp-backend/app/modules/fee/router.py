from fastapi import APIRouter
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
