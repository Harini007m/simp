from datetime import date, datetime

from sqlalchemy import func, select
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.finance.invoice import Invoice
from app.models.finance.payment import PaymentTransaction
from app.repositories.base import BaseRepository


SUCCESS_STATUSES = ("captured", "success", "successful", "paid")


class FinanceAnalyticsRepository(
    BaseRepository[
        PaymentTransaction,
        PaymentTransaction,
        PaymentTransaction,
    ]
):
    def __init__(self, db: AsyncSession):
        self.db = db
        super().__init__(
            PaymentTransaction,
            search_fields=[
                "transaction_id",
                "status",
                "payment_method",
                "customer_name",
                "customer_email",
            ],
        )

    async def get_revenue_trend(self):
        month = func.date_trunc("month", PaymentTransaction.created_at).label("month")

        result = await self.db.execute(
            select(
                month,
                func.coalesce(func.sum(PaymentTransaction.amount), 0),
                func.count(PaymentTransaction.id),
            )
            .where(func.lower(PaymentTransaction.status).in_(SUCCESS_STATUSES))
            .group_by(month)
            .order_by(month)
        )
        return result.all()

    async def get_revenue_between(self, start: datetime, end: datetime):
        result = await self.db.execute(
            select(func.coalesce(func.sum(PaymentTransaction.amount), 0)).where(
                PaymentTransaction.created_at >= start,
                PaymentTransaction.created_at < end,
                func.lower(PaymentTransaction.status).in_(SUCCESS_STATUSES),
            )
        )
        return result.scalar_one()

    async def get_payment_method_analysis(self):
        total_amount = func.coalesce(func.sum(PaymentTransaction.amount), 0)

        result = await self.db.execute(
            select(
                PaymentTransaction.payment_method,
                func.count(PaymentTransaction.id),
                total_amount,
            )
            .where(func.lower(PaymentTransaction.status).in_(SUCCESS_STATUSES))
            .group_by(PaymentTransaction.payment_method)
            .order_by(total_amount.desc())
        )
        return result.all()

    async def get_successful_payment_total(self):
        result = await self.db.execute(
            select(func.coalesce(func.sum(PaymentTransaction.amount), 0)).where(
                func.lower(PaymentTransaction.status).in_(SUCCESS_STATUSES)
            )
        )
        return result.scalar_one()

    async def get_collection_rate_counts(self):
        result = await self.db.execute(
            select(
                func.count(Invoice.id),
                func.count(Invoice.id).filter(func.lower(Invoice.payment_status) == "paid"),
            )
        )
        return result.one()

    async def get_refund_counts(self):
        result = await self.db.execute(
            select(
                func.count(PaymentTransaction.id),
                func.count(PaymentTransaction.id).filter(PaymentTransaction.refund.is_(True)),
            )
        )
        return result.one()

    async def get_outstanding_analysis(self):
        today = date.today()

        result = await self.db.execute(
            select(
                func.count(Invoice.id),
                func.coalesce(func.sum(Invoice.grand_total), 0),
                func.count(Invoice.id).filter(Invoice.due_date < today),
            ).where(func.lower(Invoice.payment_status) != "paid")
        )
        return result.one()
