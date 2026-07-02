from fastapi import APIRouter

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
