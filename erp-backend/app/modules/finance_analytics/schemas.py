from decimal import Decimal
from typing import List

from pydantic import BaseModel, ConfigDict


class RevenueTrendItem(BaseModel):
    month: str
    total_revenue: Decimal
    transaction_count: int


class MonthlyComparisonResponse(BaseModel):
    current_month_revenue: Decimal
    previous_month_revenue: Decimal
    revenue_difference: Decimal
    growth_percentage: float


class PaymentMethodAnalysisItem(BaseModel):
    payment_method: str
    transaction_count: int
    total_amount: Decimal
    percentage: float


class CollectionRateResponse(BaseModel):
    paid_invoices: int
    total_invoices: int
    collection_percentage: float


class RefundAnalysisResponse(BaseModel):
    refund_count: int
    refund_amount: Decimal
    refund_percentage: float


class OutstandingAnalysisResponse(BaseModel):
    pending_invoice_count: int
    pending_amount: Decimal
    overdue_invoice_count: int


class TopProgramRevenueItem(BaseModel):
    program: str
    total_revenue: Decimal


class FinanceAnalyticsDashboardResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    revenue_trend: List[RevenueTrendItem]
    monthly_comparison: MonthlyComparisonResponse
    payment_method_analysis: List[PaymentMethodAnalysisItem]
    collection_rate: CollectionRateResponse
    refund_analysis: RefundAnalysisResponse
    outstanding_analysis: OutstandingAnalysisResponse
    top_program_revenue: List[TopProgramRevenueItem]
