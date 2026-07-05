"""Fix orphaned alembic_version row."""
import re
import os
import sys

# Add project root to path
sys.path.insert(0, os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from sqlalchemy import create_engine, text
from dotenv import load_dotenv

load_dotenv()

db_url = os.getenv("DATABASE_URL")
url = re.sub(r"postgresql\+asyncpg://", "postgresql+psycopg2://", db_url)
url = re.sub(r"\?ssl=require", "", url)

engine = create_engine(url, connect_args={"sslmode": "require"})
with engine.connect() as conn:
    result = conn.execute(text("SELECT version_num FROM alembic_version"))
    rows = [r[0] for r in result]
    print("Current version(s):", rows)
    conn.execute(text("UPDATE alembic_version SET version_num = '554c6950560a'"))
    conn.commit()
    print("Stamped to 554c6950560a")
engine.dispose()
