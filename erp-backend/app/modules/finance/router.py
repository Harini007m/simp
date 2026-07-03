from fastapi import APIRouter

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
