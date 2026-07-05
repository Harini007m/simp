from datetime import datetime
from decimal import Decimal
from typing import List

from pydantic import BaseModel, ConfigDict


# -----------------------------
# Dashboard Cards
# -----------------------------

class TodayCollectionResponse(BaseModel):
    total_collection: Decimal
    transaction_count: int
    growth_percentage: float


class MonthlyRevenueResponse(BaseModel):
    total_revenue: Decimal
    payment_count: int
    collection_rate: float
    growth_percentage: float


class PendingDuesResponse(BaseModel):
    pending_amount: Decimal
    pending_invoices: int
    overdue_invoices: int


class WalletSummaryResponse(BaseModel):
    wallet_balance: Decimal
    escrow_amount: Decimal
    refund_reserve: Decimal
    operational_balance: Decimal


# -----------------------------
# Lists
# -----------------------------

class TransactionItem(BaseModel):
    transaction_id: str
    amount: Decimal
    payment_method: str
    status: str
    created_at: datetime


class RefundSummaryResponse(BaseModel):
    pending_refunds: int
    approved_refunds: int
    rejected_refunds: int


class ActivityItem(BaseModel):
    activity_type: str
    title: str
    description: str
    created_at: datetime


# -----------------------------
# Dashboard
# -----------------------------

class FinanceDashboardResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    today_collection: TodayCollectionResponse
    monthly_revenue: MonthlyRevenueResponse
    pending_dues: PendingDuesResponse
    wallet: WalletSummaryResponse

    recent_transactions: List[TransactionItem]
    refunds: RefundSummaryResponse
    recent_activity: List[ActivityItem]


class FinanceDashboardSummaryResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    today_collection: TodayCollectionResponse
    monthly_revenue: MonthlyRevenueResponse
    pending_dues: PendingDuesResponse
    wallet: WalletSummaryResponse
    refunds: RefundSummaryResponse
