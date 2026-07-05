from sqlalchemy.ext.asyncio import AsyncSession

from app.modules.finance.repository import FinanceRepository
from app.modules.finance.schemas import (
    FinanceDashboardResponse,
    FinanceDashboardSummaryResponse,
    MonthlyRevenueResponse,
    PendingDuesResponse,
    RefundSummaryResponse,
    TodayCollectionResponse,
    TransactionItem,
    ActivityItem,
    WalletSummaryResponse,
)


class FinanceService:

    def __init__(self, db: AsyncSession):
        self.repository = FinanceRepository(db)

    async def get_dashboard(self) -> FinanceDashboardResponse:
        today = await self.repository.get_today_collection()
        monthly = await self.repository.get_monthly_revenue()
        pending = await self.repository.get_pending_dues()
        transactions = await self.repository.get_recent_transactions()
        refunds = await self.repository.get_refund_summary()
        activity = await self.repository.get_recent_activity()

        return FinanceDashboardResponse(
            today_collection=today,
            monthly_revenue=monthly,
            pending_dues=pending,
            wallet=WalletSummaryResponse(
                wallet_balance=0,
                escrow_amount=0,
                refund_reserve=0,
                operational_balance=0,
            ),
            recent_transactions=transactions,
            refunds=refunds,
            recent_activity=activity,
        )

    async def get_dashboard_summary(self) -> FinanceDashboardSummaryResponse:
        return FinanceDashboardSummaryResponse(
            today_collection=await self.repository.get_today_collection(),
            monthly_revenue=await self.repository.get_monthly_revenue(),
            pending_dues=await self.repository.get_pending_dues(),
            wallet=await self.get_wallet_summary(),
            refunds=await self.repository.get_refund_summary(),
        )

    async def get_today_collection(self) -> TodayCollectionResponse:
        return await self.repository.get_today_collection()

    async def get_monthly_revenue(self) -> MonthlyRevenueResponse:
        return await self.repository.get_monthly_revenue()

    async def get_pending_dues(self) -> PendingDuesResponse:
        return await self.repository.get_pending_dues()

    async def get_wallet_summary(self) -> WalletSummaryResponse:
        return WalletSummaryResponse(
            wallet_balance=0,
            escrow_amount=0,
            refund_reserve=0,
            operational_balance=0,
        )

    async def get_recent_transactions(self) -> list[TransactionItem]:
        return await self.repository.get_recent_transactions()

    async def get_pending_refunds(self) -> RefundSummaryResponse:
        return await self.repository.get_refund_summary()

    async def get_recent_activity(self) -> list[ActivityItem]:
        return await self.repository.get_recent_activity()
