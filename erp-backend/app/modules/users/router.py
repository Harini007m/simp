from fastapi import APIRouter, Depends
from sqlalchemy.ext.asyncio import AsyncSession
from uuid import UUID
from app.core.database import get_db
from app.core.dependencies import get_current_user, require_permission
from app.core.responses import success_response, APIResponse
from app.core.schemas import PaginatedResponse, SearchParams
from app.modules.users.schemas import UserCreate, UserUpdate, UserResponse
from app.modules.users.service import UserService
from app.models.authentication.user import User

router = APIRouter()

@router.post("/search", response_model=APIResponse[PaginatedResponse])
async def search_users(
    params: SearchParams,
    current_user: User = Depends(require_permission("users", "read")),
    db: AsyncSession = Depends(get_db)
):
    service = UserService(db)
    result = await service.search_paginated(params)
    
    # Fetch roles for all users in the page
    from app.models.rbac.user_role import UserRole
    from app.models.rbac.role import Role
    from sqlalchemy import select
    
    user_ids = [user.id for user in result.items]
    roles_map = {}
    if user_ids:
        roles_query = await db.execute(
            select(UserRole.user_id, Role.id, Role.name)
            .join(Role, UserRole.role_id == Role.id)
            .where(UserRole.user_id.in_(user_ids))
        )
        for row in roles_query:
            roles_map[row[0]] = {"roleId": row[1], "roleName": row[2]}
            
    # Serialize items
    items_dump = []
    for user in result.items:
        user_dict = {
            "id": user.id,
            "username": user.username,
            "email": user.email,
            "account_status": user.account_status,
            "created_at": user.created_at,
        }
        role_info = roles_map.get(user.id)
        if role_info:
            user_dict["roleId"] = role_info["roleId"]
            user_dict["roleName"] = role_info["roleName"]
        items_dump.append(user_dict)
        
    return success_response(data={
        "items": items_dump,
        "total": result.total,
        "page": result.page,
        "page_size": result.page_size,
        "total_pages": result.total_pages
    })

@router.post("/", response_model=APIResponse[UserResponse])
async def create_user(
    data: UserCreate,
    current_user: User = Depends(require_permission("users", "create")),
    db: AsyncSession = Depends(get_db)
):
    service = UserService(db)
    result = await service.create(obj_in=data, user_id=current_user.id)
    # Serialize for response
    user_data = UserResponse(
        id=result.id,
        username=result.username,
        email=result.email,
        account_status=result.account_status
    )
    return success_response(data=user_data.model_dump(), message="User created successfully")

@router.get("/{id}", response_model=APIResponse[UserResponse])
async def get_user(
    id: UUID,
    current_user: User = Depends(require_permission("users", "read")),
    db: AsyncSession = Depends(get_db)
):
    service = UserService(db)
    result = await service.get(id)
    user_data = UserResponse(
        id=result.id,
        username=result.username,
        email=result.email,
        account_status=result.account_status
    )
    return success_response(data=user_data.model_dump())

@router.patch("/{id}", response_model=APIResponse[UserResponse])
async def update_user(
    id: UUID,
    data: UserUpdate,
    current_user: User = Depends(require_permission("users", "update")),
    db: AsyncSession = Depends(get_db)
):
    service = UserService(db)
    result = await service.update(id=id, obj_in=data, user_id=current_user.id)
    user_data = UserResponse(
        id=result.id,
        username=result.username,
        email=result.email,
        account_status=result.account_status
    )
    return success_response(data=user_data.model_dump(), message="User updated successfully")

@router.post("/{id}/lock", response_model=APIResponse[UserResponse])
async def lock_user_account(
    id: UUID,
    current_user: User = Depends(require_permission("users", "update")),
    db: AsyncSession = Depends(get_db)
):
    service = UserService(db)
    result = await service.lock_account(id, current_user.id)
    user_data = UserResponse(
        id=result.id,
        username=result.username,
        email=result.email,
        account_status=result.account_status
    )
    return success_response(data=user_data.model_dump(), message="Account locked successfully")

@router.delete("/{id}", response_model=APIResponse[dict])
async def delete_user(
    id: UUID,
    current_user: User = Depends(require_permission("users", "delete")),
    db: AsyncSession = Depends(get_db)
):
    service = UserService(db)
    await service.delete(id=id, user_id=current_user.id)
    return success_response(data={"deleted": True}, message="User deleted successfully")
