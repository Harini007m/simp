from fastapi import APIRouter

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
