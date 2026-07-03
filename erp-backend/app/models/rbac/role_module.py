import uuid
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import ForeignKey, UniqueConstraint
from app.models.core.mixins import BaseModel

class RoleModule(BaseModel):
    __tablename__ = 'rbac_role_modules'
    __table_args__ = (
        UniqueConstraint('role_id', 'module_id', name='uq_rbac_role_module'),
        {'comment': 'Junction mapping roles to modules'}
    )

    role_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('rbac_roles.id', ondelete='CASCADE'), index=True, nullable=False)
    module_id: Mapped[uuid.UUID] = mapped_column(ForeignKey('rbac_modules.id', ondelete='CASCADE'), index=True, nullable=False)

    role: Mapped["Role"] = relationship("Role")
    module: Mapped["Module"] = relationship("Module")
