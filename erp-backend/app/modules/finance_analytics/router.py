from fastapi import APIRouter

from app.core.database import DBSession
from app.modules.finance_analytics.schemas import (
    CollectionRateResponse,
    FinanceAnalyticsDashboardResponse,
    MonthlyComparisonResponse,
    OutstandingAnalysisResponse,
    PaymentMethodAnalysisItem,
    RefundAnalysisResponse,
    RevenueTrendItem,
    TopProgramRevenueItem,
)
from app.modules.finance_analytics.service import FinanceAnalyticsService

router = APIRouter(prefix="/finance-analytics", tags=["Finance Analytics"])


@router.get("/dashboard", response_model=FinanceAnalyticsDashboardResponse)
async def get_finance_analytics_dashboard(db: DBSession):
    return await FinanceAnalyticsService(db).get_dashboard()


@router.get("/revenue-trend", response_model=list[RevenueTrendItem])
async def get_revenue_trend(db: DBSession):
    return await FinanceAnalyticsService(db).get_revenue_trend()


@router.get("/monthly-comparison", response_model=MonthlyComparisonResponse)
async def get_monthly_comparison(db: DBSession):
    return await FinanceAnalyticsService(db).get_monthly_comparison()


@router.get("/payment-method-analysis", response_model=list[PaymentMethodAnalysisItem])
async def get_payment_method_analysis(db: DBSession):
    return await FinanceAnalyticsService(db).get_payment_method_analysis()


@router.get("/collection-rate", response_model=CollectionRateResponse)
async def get_collection_rate(db: DBSession):
    return await FinanceAnalyticsService(db).get_collection_rate()


@router.get("/refund-analysis", response_model=RefundAnalysisResponse)
async def get_refund_analysis(db: DBSession):
    return await FinanceAnalyticsService(db).get_refund_analysis()


@router.get("/outstanding-analysis", response_model=OutstandingAnalysisResponse)
async def get_outstanding_analysis(db: DBSession):
    return await FinanceAnalyticsService(db).get_outstanding_analysis()


@router.get("/top-program-revenue", response_model=list[TopProgramRevenueItem])
async def get_top_program_revenue(db: DBSession):
    return await FinanceAnalyticsService(db).get_top_program_revenue()
