from uuid import UUID
from typing import List
from sqlalchemy.ext.asyncio import AsyncSession
from fastapi import HTTPException
from app.services.base import BaseCRUDService
from app.modules.rbac.repository import RoleRepository
from app.modules.rbac.schemas import RoleCreate, RoleUpdate, PermissionAssign
from app.models.rbac.role import Role
from app.models.rbac.role_permission import RolePermission

class RoleService(BaseCRUDService[Role, RoleCreate, RoleUpdate]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, RoleRepository())

    async def assign_permissions(self, data: PermissionAssign, user_id: UUID) -> dict:
        # Business Workflow: Assign multiple permissions to a role
        role = await self.get(data.role_id)
        
        # Clear existing
        from sqlalchemy import delete
        await self.db.execute(delete(RolePermission).where(RolePermission.role_id == data.role_id))
        
        # Insert new
        for perm_id in data.permission_ids:
            rp = RolePermission(role_id=role.id, permission_id=perm_id)
            self.db.add(rp)
            
        await self.log_audit_event("ASSIGN_PERMISSIONS", "Role", user_id, new_value={"role_id": str(role.id), "permissions": [str(pid) for pid in data.permission_ids]})
        await self.commit_transaction()
        return {"success": True}

    async def assign_modules(self, role_id: UUID, module_ids: List[UUID], user_id: UUID) -> dict:
        from sqlalchemy import select, delete
        from app.models.rbac.feature import Feature
        from app.models.rbac.permission import Permission
        
        # Clear existing
        await self.db.execute(delete(RolePermission).where(RolePermission.role_id == role_id))
        
        if module_ids:
            result = await self.db.execute(
                select(Permission.id)
                .join(Feature, Permission.feature_id == Feature.id)
                .where(Feature.module_id.in_(module_ids))
            )
            perm_ids = result.scalars().all()
            
            for pid in perm_ids:
                rp = RolePermission(role_id=role_id, permission_id=pid)
                self.db.add(rp)
                
            await self.log_audit_event("ASSIGN_MODULES", "Role", user_id, new_value={"role_id": str(role_id), "modules": [str(m) for m in module_ids]})
            
        await self.commit_transaction()
        return {"success": True}
