"""
Payment Collection Management models for the Finance domain.

Models:
    PaymentGateway, PaymentGatewayLog, PaymentReconciliation, PaymentLog
"""
import uuid
from datetime import datetime
from typing import Optional, List

from sqlalchemy import (
    Boolean, DateTime, ForeignKey, Index, Integer, Numeric, String, Text,
)
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.core.mixins import BaseModel


class PaymentGateway(BaseModel):
    __tablename__ = "fin_payment_gateways"
    __table_args__ = {"comment": "Gateway configuration and provider information"}

    name: Mapped[str] = mapped_column(
        String(255), nullable=False, unique=True,
    )
    provider: Mapped[str] = mapped_column(
        String(50), nullable=False,
        comment="RAZORPAY | STRIPE | PAYU | CASHFREE | etc.",
    )
    config: Mapped[Optional[dict]] = mapped_column(
        JSONB,
        comment="Encrypted gateway credentials and configuration",
    )
    is_active: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=True,
    )
    environment: Mapped[str] = mapped_column(
        String(50), nullable=False, default="SANDBOX",
        comment="SANDBOX | PRODUCTION",
    )


class PaymentGatewayLog(BaseModel):
    __tablename__ = "fin_payment_gateway_logs"
    __table_args__ = (
        Index("ix_fin_pg_log_event_type", "event_type"),
        Index("ix_fin_pg_log_created", "created_at"),
        {"comment": "Gateway request/response logs, verification data, webhook payloads, and reconciliation info"},
    )

    payment_transaction_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("fin_payment_transactions.id", ondelete="CASCADE"), index=True, nullable=False,
    )
    event_type: Mapped[str] = mapped_column(
        String(100), nullable=False,
        comment="ORDER_CREATED | PAYMENT_AUTHORIZED | PAYMENT_CAPTURED | WEBHOOK_RECEIVED | etc.",
    )
    request_payload: Mapped[Optional[dict]] = mapped_column(JSONB)
    response_payload: Mapped[Optional[dict]] = mapped_column(JSONB)
    webhook_payload: Mapped[Optional[dict]] = mapped_column(JSONB)
    http_status_code: Mapped[Optional[int]] = mapped_column(Integer)
    is_reconciled: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=False,
        comment="Whether this log entry has been reconciled",
    )

    payment_transaction: Mapped["PaymentTransaction"] = relationship(
        "PaymentTransaction", back_populates="gateway_logs",
    )


class PaymentReconciliation(BaseModel):
    __tablename__ = "fin_payment_reconciliations"
    __table_args__ = {"comment": "ERP vs Gateway vs Bank reconciliation records"}

    payment_transaction_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("fin_payment_transactions.id", ondelete="CASCADE"), index=True, nullable=False,
    )
    erp_amount: Mapped[float] = mapped_column(
        Numeric(15, 2), nullable=False,
        comment="Amount recorded in the ERP",
    )
    gateway_amount: Mapped[Optional[float]] = mapped_column(
        Numeric(15, 2),
        comment="Amount reported by the payment gateway",
    )
    bank_amount: Mapped[Optional[float]] = mapped_column(
        Numeric(15, 2),
        comment="Amount confirmed by the bank statement",
    )
    match_status: Mapped[str] = mapped_column(
        String(50), nullable=False, default="PENDING",
        comment="MATCHED | MISMATCHED | PENDING",
    )
    reconciled_by: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), index=True,
        comment="UUID of the user who performed reconciliation (soft FK)",
    )
    reconciled_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
    )
    discrepancy_notes: Mapped[Optional[str]] = mapped_column(Text)

    payment_transaction: Mapped["PaymentTransaction"] = relationship(
        "PaymentTransaction", back_populates="reconciliations",
    )


class PaymentLog(BaseModel):
    __tablename__ = "fin_payment_logs"
    __table_args__ = (
        Index("ix_fin_payment_log_event", "event"),
        Index("ix_fin_payment_log_created", "created_at"),
        {"comment": "Complete payment lifecycle and audit events"},
    )

    payment_transaction_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("fin_payment_transactions.id", ondelete="CASCADE"), index=True, nullable=False,
    )
    event: Mapped[str] = mapped_column(
        String(100), nullable=False,
        comment="INITIATED | AUTHORIZED | CAPTURED | FAILED | REFUNDED | DISPUTED | SETTLED | etc.",
    )
    details: Mapped[Optional[dict]] = mapped_column(
        JSONB, comment="Structured event payload",
    )
    performed_by: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), index=True,
        comment="UUID of the acting user or system (soft FK)",
    )

    payment_transaction: Mapped["PaymentTransaction"] = relationship(
        "PaymentTransaction", back_populates="payment_logs",
    )
