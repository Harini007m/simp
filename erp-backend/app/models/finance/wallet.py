"""
Wallet Management models for the Finance domain.

Models:
    Wallet, WalletTransaction, WalletAdjustment, WalletRefund,
    WalletLimit, WalletFreezeHistory, WalletAuditLog
"""
import uuid
from datetime import datetime
from typing import Optional, List

from sqlalchemy import (
    Boolean, DateTime, ForeignKey, Index, Numeric, String, Text,
)
from sqlalchemy.dialects.postgresql import JSONB, UUID
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.models.core.mixins import BaseModel


class Wallet(BaseModel):
    __tablename__ = "fin_wallets"
    __table_args__ = (
        Index("ix_fin_wallets_owner", "owner_type", "owner_id", unique=True),
        {"comment": "Master wallet for students, organizations, employees, and internal accounts"},
    )

    owner_type: Mapped[str] = mapped_column(
        String(50), nullable=False,
        comment="STUDENT | ORGANIZATION | EMPLOYEE | INTERNAL",
    )
    owner_id: Mapped[uuid.UUID] = mapped_column(
        UUID(as_uuid=True), nullable=False, index=True,
        comment="UUID of the owning entity (soft FK)",
    )
    balance: Mapped[float] = mapped_column(
        Numeric(15, 2), nullable=False, default=0,
        comment="Current wallet balance",
    )
    currency: Mapped[str] = mapped_column(
        String(3), nullable=False, default="INR",
        comment="ISO 4217 currency code",
    )
    status: Mapped[str] = mapped_column(
        String(50), nullable=False, default="ACTIVE",
        comment="ACTIVE | SUSPENDED | CLOSED",
    )
    is_frozen: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=False,
        comment="Whether the wallet is currently frozen",
    )

    # ── relationships ──
    transactions: Mapped[List["WalletTransaction"]] = relationship(
        "WalletTransaction", back_populates="wallet", cascade="all, delete-orphan",
    )
    adjustments: Mapped[List["WalletAdjustment"]] = relationship(
        "WalletAdjustment", back_populates="wallet", cascade="all, delete-orphan",
    )
    refunds: Mapped[List["WalletRefund"]] = relationship(
        "WalletRefund", back_populates="wallet", cascade="all, delete-orphan",
    )
    limit: Mapped[Optional["WalletLimit"]] = relationship(
        "WalletLimit", back_populates="wallet", uselist=False, cascade="all, delete-orphan",
    )
    freeze_history: Mapped[List["WalletFreezeHistory"]] = relationship(
        "WalletFreezeHistory", back_populates="wallet", cascade="all, delete-orphan",
    )
    audit_logs: Mapped[List["WalletAuditLog"]] = relationship(
        "WalletAuditLog", back_populates="wallet", cascade="all, delete-orphan",
    )


class WalletTransaction(BaseModel):
    __tablename__ = "fin_wallet_transactions"
    __table_args__ = (
        Index("ix_fin_wallet_txn_type", "transaction_type"),
        Index("ix_fin_wallet_txn_created", "created_at"),
        {"comment": "All wallet credits, debits, transfers, refunds, scholarships, incentives, cashback, and adjustments"},
    )

    wallet_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("fin_wallets.id", ondelete="CASCADE"), index=True, nullable=False,
    )
    transaction_type: Mapped[str] = mapped_column(
        String(50), nullable=False,
        comment="CREDIT | DEBIT | TRANSFER | REFUND | SCHOLARSHIP | INCENTIVE | CASHBACK | ADJUSTMENT",
    )
    amount: Mapped[float] = mapped_column(
        Numeric(15, 2), nullable=False,
    )
    balance_before: Mapped[float] = mapped_column(
        Numeric(15, 2), nullable=False,
    )
    balance_after: Mapped[float] = mapped_column(
        Numeric(15, 2), nullable=False,
    )
    reference_type: Mapped[Optional[str]] = mapped_column(
        String(100),
        comment="Entity type that triggered this transaction (e.g. INVOICE, REFUND_REQUEST)",
    )
    reference_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), index=True,
        comment="UUID of the triggering entity (soft FK)",
    )
    description: Mapped[Optional[str]] = mapped_column(Text)

    wallet: Mapped["Wallet"] = relationship("Wallet", back_populates="transactions")


class WalletAdjustment(BaseModel):
    __tablename__ = "fin_wallet_adjustments"
    __table_args__ = {"comment": "Manual financial adjustments performed by Finance team"}

    wallet_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("fin_wallets.id", ondelete="CASCADE"), index=True, nullable=False,
    )
    adjustment_type: Mapped[str] = mapped_column(
        String(50), nullable=False, comment="CREDIT | DEBIT",
    )
    amount: Mapped[float] = mapped_column(
        Numeric(15, 2), nullable=False,
    )
    reason: Mapped[str] = mapped_column(Text, nullable=False)
    approved_by: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), index=True,
        comment="UUID of the approving user (soft FK)",
    )

    wallet: Mapped["Wallet"] = relationship("Wallet", back_populates="adjustments")


class WalletRefund(BaseModel):
    __tablename__ = "fin_wallet_refunds"
    __table_args__ = {"comment": "Refunds credited back into wallets"}

    wallet_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("fin_wallets.id", ondelete="CASCADE"), index=True, nullable=False,
    )
    refund_amount: Mapped[float] = mapped_column(
        Numeric(15, 2), nullable=False,
    )
    reason: Mapped[Optional[str]] = mapped_column(Text)
    source_transaction_id: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), index=True,
        comment="Original transaction that is being refunded (soft FK)",
    )
    status: Mapped[str] = mapped_column(
        String(50), nullable=False, default="PENDING",
        comment="PENDING | COMPLETED | FAILED",
    )

    wallet: Mapped["Wallet"] = relationship("Wallet", back_populates="refunds")


class WalletLimit(BaseModel):
    __tablename__ = "fin_wallet_limits"
    __table_args__ = {"comment": "Wallet limits, overdraft settings, and balance constraints"}

    wallet_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("fin_wallets.id", ondelete="CASCADE"), unique=True, index=True, nullable=False,
    )
    max_balance: Mapped[Optional[float]] = mapped_column(
        Numeric(15, 2), comment="Maximum allowed wallet balance",
    )
    daily_debit_limit: Mapped[Optional[float]] = mapped_column(
        Numeric(15, 2), comment="Maximum debit allowed per day",
    )
    daily_credit_limit: Mapped[Optional[float]] = mapped_column(
        Numeric(15, 2), comment="Maximum credit allowed per day",
    )
    overdraft_allowed: Mapped[bool] = mapped_column(
        Boolean, nullable=False, default=False,
    )
    overdraft_limit: Mapped[Optional[float]] = mapped_column(
        Numeric(15, 2), default=0,
        comment="Maximum overdraft amount if allowed",
    )

    wallet: Mapped["Wallet"] = relationship("Wallet", back_populates="limit")


class WalletFreezeHistory(BaseModel):
    __tablename__ = "fin_wallet_freeze_history"
    __table_args__ = {"comment": "Freeze / unfreeze history for wallets"}

    wallet_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("fin_wallets.id", ondelete="CASCADE"), index=True, nullable=False,
    )
    action: Mapped[str] = mapped_column(
        String(50), nullable=False, comment="FREEZE | UNFREEZE",
    )
    reason: Mapped[Optional[str]] = mapped_column(Text)
    performed_by: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), index=True,
        comment="UUID of the user who performed the action (soft FK)",
    )

    wallet: Mapped["Wallet"] = relationship("Wallet", back_populates="freeze_history")


class WalletAuditLog(BaseModel):
    __tablename__ = "fin_wallet_audit_logs"
    __table_args__ = (
        Index("ix_fin_wallet_audit_created", "created_at"),
        {"comment": "Immutable audit trail for all wallet operations"},
    )

    wallet_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey("fin_wallets.id", ondelete="CASCADE"), index=True, nullable=False,
    )
    action: Mapped[str] = mapped_column(
        String(100), nullable=False,
        comment="Machine-readable action tag, e.g. WALLET_CREATED, BALANCE_CREDITED",
    )
    details: Mapped[Optional[dict]] = mapped_column(
        JSONB, comment="Structured payload with before/after snapshots",
    )
    performed_by: Mapped[Optional[uuid.UUID]] = mapped_column(
        UUID(as_uuid=True), index=True,
        comment="UUID of the acting user (soft FK)",
    )
    ip_address: Mapped[Optional[str]] = mapped_column(
        String(45), comment="Client IP address (IPv4 or IPv6)",
    )

    wallet: Mapped["Wallet"] = relationship("Wallet", back_populates="audit_logs")
