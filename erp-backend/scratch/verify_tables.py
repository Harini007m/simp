"""Verify all 14 new finance tables exist in the database."""
import re, os, sys
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
from sqlalchemy import create_engine, text
from dotenv import load_dotenv
load_dotenv()

db_url = os.getenv("DATABASE_URL")
url = re.sub(r"postgresql\+asyncpg://", "postgresql+psycopg2://", db_url)
url = re.sub(r"\?ssl=require", "", url)

EXPECTED = [
    "fin_wallets", "fin_wallet_transactions", "fin_wallet_adjustments",
    "fin_wallet_refunds", "fin_wallet_limits", "fin_wallet_freeze_history",
    "fin_wallet_audit_logs", "fin_billing_templates", "fin_invoice_reminders",
    "fin_refund_requests", "fin_refund_transactions", "fin_payment_gateways",
    "fin_payment_gateway_logs", "fin_payment_reconciliations", "fin_payment_logs",
]

engine = create_engine(url, connect_args={"sslmode": "require"})
with engine.connect() as conn:
    result = conn.execute(text(
        "SELECT table_name FROM information_schema.tables "
        "WHERE table_schema = 'public' AND table_name LIKE 'fin_%' "
        "ORDER BY table_name"
    ))
    found = [r[0] for r in result]

print(f"Found {len(found)} fin_* tables:\n")
for t in found:
    marker = "NEW" if t in EXPECTED else "   "
    print(f"  [{marker}] {t}")

missing = set(EXPECTED) - set(found)
if missing:
    print(f"\nMISSING: {missing}")
else:
    print(f"\nAll {len(EXPECTED)} new tables verified successfully!")

engine.dispose()
