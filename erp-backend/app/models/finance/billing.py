"""
Billing & Invoice Management models for the Finance domain.

Models:
    BillingTemplate, InvoiceReminder, RefundRequest, RefundTransaction
"""
import uuid
from datetime import datetime
from typing import Optional, List

from sqlalchemy import (
    Boolean, DateTime, ForeignKey, Numeric, String, Text,
)
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.core.mixins import BaseModel


class BillingTemplate(BaseModel):
    __tablename__ = "fin_billing_templates"
    __table_args__ = {"comment": "Invoice, receipt, reminder, and PDF templates"}

    name: Mapped[str] = mapped_column(String(255), nullable=False)
    template_type: Mapped[str] = mapped_column(
        String(50), nullable=False,
        comment="INVOICE | RECEIPT | REMINDER | PDF",
    )
    content: Mapped[Optional[str]] = mapped_column(
        Text, comment="Template body (HTML / Jinja2 / Markdown)",
    )
    is_default: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=False,
        comment="Whether this template is the default for its type",
    )


class InvoiceReminder(BaseModel):
    __tablename__ = "fin_invoice_reminders"
    __table_args__ = {"comment": "Reminder history for due invoices"}

    invoice_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("fin_invoices.id", ondelete="CASCADE"), index=True, nullable=False,
    )
    reminder_type: Mapped[str] = mapped_column(
        String(50), nullable=False,
        comment="UPCOMING_DUE | DUE_TODAY | OVERDUE | FAILED_PAYMENT",
    )
    sent_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        comment="Timestamp when the reminder was actually sent",
    )
    channel: Mapped[str] = mapped_column(
        String(50), nullable=False, default="EMAIL",
        comment="EMAIL | SMS | WHATSAPP",
    )
    status: Mapped[str] = mapped_column(
        String(50), nullable=False, default="PENDING",
        comment="PENDING | SENT | FAILED",
    )

    invoice: Mapped["Invoice"] = relationship("Invoice", back_populates="reminders")


class RefundRequest(BaseModel):
    __tablename__ = "fin_refund_requests"
    __table_args__ = {"comment": "Refund requests awaiting approval"}

    invoice_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("fin_invoices.id", ondelete="CASCADE"), index=True, nullable=False,
    )
    requested_by: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), index=True,
        comment="UUID of the user who raised the request (soft FK)",
    )
    amount: Mapped[float] = mapped_column(
        Numeric(15, 2), nullable=False,
    )
    reason: Mapped[Optional[str]] = mapped_column(Text)
    status: Mapped[str] = mapped_column(
        String(50), nullable=False, default="PENDING",
        comment="PENDING | APPROVED | REJECTED",
    )
    reviewed_by: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), index=True,
        comment="UUID of the reviewer (soft FK)",
    )
    reviewed_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
    )

    invoice: Mapped["Invoice"] = relationship("Invoice", back_populates="refund_requests")
    refund_transaction: Mapped[Optional["RefundTransaction"]] = relationship(
        "RefundTransaction", back_populates="refund_request", uselist=False, cascade="all, delete-orphan",
    )


class RefundTransaction(BaseModel):
    __tablename__ = "fin_refund_transactions"
    __table_args__ = {"comment": "Completed refund transactions"}

    refund_request_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("fin_refund_requests.id", ondelete="CASCADE"), unique=True, index=True, nullable=False,
    )
    refund_amount: Mapped[float] = mapped_column(
        Numeric(15, 2), nullable=False,
    )
    refund_method: Mapped[str] = mapped_column(
        String(50), nullable=False,
        comment="WALLET | BANK_TRANSFER | GATEWAY_REVERSAL | etc.",
    )
    transaction_reference: Mapped[Optional[str]] = mapped_column(
        String(255), index=True,
        comment="External reference from payment gateway or bank",
    )
    refunded_at: Mapped[Optional[datetime]] = mapped_column(
        DateTime(timezone=True),
        comment="Timestamp when the refund was processed",
    )

    refund_request: Mapped["RefundRequest"] = relationship(
        "RefundRequest", back_populates="refund_transaction",
    )
