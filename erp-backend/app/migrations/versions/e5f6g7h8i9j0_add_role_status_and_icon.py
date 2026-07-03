"""Add is_active and icon fields to rbac_roles table

Revision ID: e5f6g7h8i9j0
Revises: b85d1d564f15
Create Date: 2026-07-03 10:00:00.000000

"""

from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = "e5f6g7h8i9j0"
down_revision = "b85d1d564f15"
branch_labels = None
depends_on = None


def upgrade() -> None:
    # Add is_active column with default value True
    op.add_column(
        "rbac_roles",
        sa.Column(
            "is_active",
            sa.Boolean(),
            nullable=False,
            server_default="true",
            comment="Active/Inactive status",
        ),
    )

    # Add icon column
    op.add_column(
        "rbac_roles",
        sa.Column("icon", sa.String(500), nullable=True, comment="Role icon URL or data"),
    )


def downgrade() -> None:
    # Remove columns
    op.drop_column("rbac_roles", "icon")
    op.drop_column("rbac_roles", "is_active")
