import re

with open("app/modules/rbac/router.py", "r") as f:
    content = f.read()

# 1. Update search_roles
search_replacement = """@router.post("/roles/search", response_model=APIResponse[dict])
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
    return success_response(data=res_dict)"""

content = re.sub(
    r'@router.post\("/roles/search", response_model=APIResponse\[PaginatedResponse\]\).*?return success_response\(data=result\.model_dump\(\)\)',
    search_replacement,
    content,
    flags=re.DOTALL
)

# 2. Update create_role
create_replacement = """@router.post("/roles", response_model=APIResponse[dict])
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
    return success_response(data=role_data, message="Role created successfully")"""

content = re.sub(
    r'@router.post\("/roles", response_model=APIResponse\[RoleResponse\]\).*?message="Role created successfully"\)',
    create_replacement,
    content,
    flags=re.DOTALL
)

# 3. Update get_roles dictionary building
content = re.sub(
    r'        if r_id not in role_modules:\n            role_modules\[r_id\] = set\(\)\n        role_modules\[r_id\]\.add\(str\(m_id\)\)',
    r'        r_id_str = str(r_id)\n        if r_id_str not in role_modules:\n            role_modules[r_id_str] = set()\n        role_modules[r_id_str].add(str(m_id))',
    content
)

content = re.sub(
    r'role_modules\.get\(r\.id, \[\]\)',
    r'role_modules.get(str(r.id), [])',
    content
)

# 4. Update update_role
update_replacement = """@router.patch("/roles/{id}", response_model=APIResponse[dict])
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
    return success_response(data=response_data, message="Role updated successfully")"""

content = re.sub(
    r'@router.patch\("/roles/\{id\}", response_model=APIResponse\[dict\]\).*?message="Role updated successfully"\)',
    update_replacement,
    content,
    flags=re.DOTALL
)

with open("app/modules/rbac/router.py", "w") as f:
    f.write(content)
