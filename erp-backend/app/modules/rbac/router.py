from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from app.core.database import get_db
from app.core.dependencies import get_current_user, require_permission
from app.core.responses import success_response, APIResponse
from app.core.schemas import PaginatedResponse, SearchParams
from app.modules.rbac.schemas import RoleCreate, RoleCreateWithModules, RoleUpdate, RoleUpdateWithModules, RoleResponse, PermissionAssign
from app.modules.rbac.service import RoleService
from app.models.authentication.user import User

router = APIRouter()

from app.modules.rbac.module_router import router as module_api_router
router.include_router(module_api_router, prefix="/modules", tags=["RBAC Modules"])

@router.post("/roles/search", response_model=APIResponse[dict])
async def search_roles(
    params: SearchParams,
    current_user: User = Depends(require_permission("roles", "read")),
    db: AsyncSession = Depends(get_db)
):
    service = RoleService(db)
    result = await service.search_paginated(params)
    
    from sqlalchemy import select
    from app.models.rbac.role_permission import RolePermission
    from app.models.rbac.permission import Permission
    from app.models.rbac.feature import Feature
    from app.models.rbac.module import Module
    
    role_ids = [item.id for item in result.items]
    new_items = []
    
    if role_ids:
        role_modules_result = await db.execute(
            select(RolePermission.role_id, Feature.module_id)
            .join(Permission, RolePermission.permission_id == Permission.id)
            .join(Feature, Permission.feature_id == Feature.id)
            .where(RolePermission.role_id.in_(role_ids))
        )
        role_modules = {}
        for r_id, m_id in role_modules_result:
            r_id_str = str(r_id)
            if r_id_str not in role_modules:
                role_modules[r_id_str] = set()
            role_modules[r_id_str].add(str(m_id))
            
        all_module_ids = []
        if any(item.code == "SUPER_ADMIN" for item in result.items):
            all_modules = await db.execute(select(Module.id))
            all_module_ids = [str(m) for m in all_modules.scalars().all()]
            
        for r in result.items:
            r_dict = {
                "id": str(r.id),
                "name": r.name,
                "code": r.code,
                "description": r.description,
                "is_system": r.is_system,
                "moduleIds": all_module_ids if r.code == "SUPER_ADMIN" else list(role_modules.get(str(r.id), []))
            }
            new_items.append(r_dict)
            
    res_dict = result.model_dump()
    res_dict["items"] = new_items
    return success_response(data=res_dict)

@router.post("/roles", response_model=APIResponse[dict])
async def create_role(
    data: RoleCreateWithModules,
    current_user: User = Depends(require_permission("roles", "create")),
    db: AsyncSession = Depends(get_db)
):
    service = RoleService(db)
    role_create = RoleCreate(
        name=data.name,
        code=data.code,
        description=data.description,
        is_system=data.is_system
    )
    result = await service.create(obj_in=role_create, user_id=current_user.id)

    if data.module_ids is not None:
        await service.assign_modules(result.id, data.module_ids, current_user.id)

    role_data = {
        "id": str(result.id),
        "name": result.name,
        "code": result.code,
        "description": result.description,
        "is_system": result.is_system,
        "moduleIds": [str(m) for m in data.module_ids] if data.module_ids else []
    }
    return success_response(data=role_data, message="Role created successfully")

@router.post("/roles/assign-permissions", response_model=APIResponse[dict])
async def assign_permissions(
    data: PermissionAssign,
    # current_user: User = Depends(require_permission("roles", "update")),
    db: AsyncSession = Depends(get_db)
):
    service = RoleService(db)
    # Using dummy user_id if current_user is omitted for testing
    result = await service.assign_permissions(data, user_id=None)
    return success_response(data=result, message="Permissions assigned successfully")

@router.get("/roles", response_model=APIResponse[dict])
async def get_roles(
    db: AsyncSession = Depends(get_db)
):
    from sqlalchemy import select
    from app.models.rbac.role import Role
    from app.models.rbac.role_permission import RolePermission
    from app.models.rbac.permission import Permission
    from app.models.rbac.feature import Feature
    from app.models.rbac.module import Module
    
    result = await db.execute(select(Role))
    roles = result.scalars().all()
    
    role_modules_result = await db.execute(
        select(RolePermission.role_id, Feature.module_id)
        .join(Permission, RolePermission.permission_id == Permission.id)
        .join(Feature, Permission.feature_id == Feature.id)
    )
    
    role_modules = {}
    for r_id, m_id in role_modules_result:
        r_id_str = str(r_id)
        if r_id_str not in role_modules:
            role_modules[r_id_str] = set()
        role_modules[r_id_str].add(str(m_id))
        
    all_module_ids = []
    if any(r.code == "SUPER_ADMIN" for r in roles):
        all_modules = await db.execute(select(Module.id))
        all_module_ids = [str(m) for m in all_modules.scalars().all()]
        
    data = [
        {
            "id": str(r.id),
            "name": r.name,
            "code": r.code,
            "description": r.description,
            "permissions": ["all"] if r.code == "SUPER_ADMIN" else [],
            "moduleIds": all_module_ids if r.code == "SUPER_ADMIN" else list(role_modules.get(str(r.id), []))
        } for r in roles
    ]
    return success_response(data=data)

@router.get("/roles/{id}", response_model=APIResponse[dict])
async def get_role(
    id: UUID,
    db: AsyncSession = Depends(get_db)
):
    service = RoleService(db)
    result = await service.get(id)
    
    from sqlalchemy import select
    from app.models.rbac.role_permission import RolePermission
    from app.models.rbac.permission import Permission
    from app.models.rbac.feature import Feature
    from app.models.rbac.module import Module
    
    if result.code == "SUPER_ADMIN":
        all_modules = await db.execute(select(Module.id))
        module_ids = [str(m) for m in all_modules.scalars().all()]
    else:
        role_modules_result = await db.execute(
            select(Feature.module_id)
            .select_from(RolePermission)
            .join(Permission, RolePermission.permission_id == Permission.id)
            .join(Feature, Permission.feature_id == Feature.id)
            .where(RolePermission.role_id == id)
        )
        module_ids = list({str(m) for m in role_modules_result.scalars().all()})
        
    data = {
        "id": str(result.id),
        "name": result.name,
        "code": result.code,
        "description": result.description,
        "permissions": ["all"] if result.code == "SUPER_ADMIN" else [],
        "moduleIds": module_ids
    }
    return success_response(data=data)

@router.patch("/roles/{id}", response_model=APIResponse[dict])
async def update_role(
    id: UUID,
    data: RoleUpdateWithModules,
    db: AsyncSession = Depends(get_db),
    current_user: User = Depends(require_permission("roles", "update"))
):
    service = RoleService(db)
    role_update = RoleUpdate(
        name=data.name,
        description=data.description
    )
    result = await service.update(id=id, obj_in=role_update, user_id=current_user.id)

    if data.module_ids is not None:
        await service.assign_modules(result.id, data.module_ids, current_user.id)

    response_data = {
        "id": str(result.id),
        "name": result.name,
        "code": result.code,
        "description": result.description,
        "moduleIds": [str(m) for m in data.module_ids] if data.module_ids is not None else []
    }
    return success_response(data=response_data, message="Role updated successfully")

@router.delete("/roles/{id}", response_model=APIResponse[dict])
async def delete_role(
    id: UUID,
    db: AsyncSession = Depends(get_db)
):
    service = RoleService(db)
    await service.delete(id=id)
    return success_response(data={"deleted": True}, message="Role deleted successfully")
