from fastapi import APIRouter

from app.core.database import DBSession
from app.modules.finance.schemas import (
    ActivityItem,
    FinanceDashboardResponse,
    FinanceDashboardSummaryResponse,
    MonthlyRevenueResponse,
    PendingDuesResponse,
    RefundSummaryResponse,
    TodayCollectionResponse,
    TransactionItem,
    WalletSummaryResponse,
)
from app.modules.finance.service import FinanceService

router = APIRouter(prefix="/finance", tags=["Finance"])


@router.get("/dashboard", response_model=FinanceDashboardResponse)
async def get_finance_dashboard(db: DBSession):
    return await FinanceService(db).get_dashboard()


@router.get("/dashboard/summary", response_model=FinanceDashboardSummaryResponse)
async def get_finance_dashboard_summary(db: DBSession):
    return await FinanceService(db).get_dashboard_summary()


@router.get("/collections/today", response_model=TodayCollectionResponse)
async def get_today_collections(db: DBSession):
    return await FinanceService(db).get_today_collection()


@router.get("/revenue/monthly", response_model=MonthlyRevenueResponse)
async def get_monthly_revenue(db: DBSession):
    return await FinanceService(db).get_monthly_revenue()


@router.get("/pending-dues", response_model=PendingDuesResponse)
async def get_pending_dues(db: DBSession):
    return await FinanceService(db).get_pending_dues()


@router.get("/wallet", response_model=WalletSummaryResponse)
async def get_wallet_summary(db: DBSession):
    return await FinanceService(db).get_wallet_summary()


@router.get("/transactions/recent", response_model=list[TransactionItem])
async def get_recent_transactions(db: DBSession):
    return await FinanceService(db).get_recent_transactions()


@router.get("/refunds/pending", response_model=RefundSummaryResponse)
async def get_pending_refunds(db: DBSession):
    return await FinanceService(db).get_pending_refunds()


@router.get("/activity", response_model=list[ActivityItem])
async def get_recent_activity(db: DBSession):
    return await FinanceService(db).get_recent_activity()
