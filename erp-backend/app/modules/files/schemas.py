from __future__ import annotations

from datetime import datetime
from typing import Optional, List
from uuid import UUID

from pydantic import BaseModel, ConfigDict

from app.models.files.enums import (
    FileStatusEnum,
    AccessLevelEnum,
)


# ------------------------------------------------------------------
# Create
# ------------------------------------------------------------------

class FileCreate(BaseModel):
    file_name: str
    display_name: str
    unique_file_name: str

    description: Optional[str] = None

    file_type: str
    file_extension: str
    file_size: int

    checksum: str

    storage_provider: str = "Local"
    storage_path: str

    public_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    preview_url: Optional[str] = None

    category: str
    module_name: str
    entity_name: str
    entity_id: UUID

    folder_name: Optional[str] = None
    tags: Optional[List[str]] = None

    status: FileStatusEnum = FileStatusEnum.DRAFT

    uploaded_by: UUID

    expires_at: Optional[datetime] = None

    is_public: bool = False
    is_downloadable: bool = True
    is_editable: bool = False
    is_confidential: bool = False

    access_level: AccessLevelEnum = AccessLevelEnum.INTERNAL

    remarks: Optional[str] = None

    file_metadata: Optional[dict] = None


# ------------------------------------------------------------------
# Update
# ------------------------------------------------------------------

class FileUpdate(BaseModel):
    display_name: Optional[str] = None
    description: Optional[str] = None

    public_url: Optional[str] = None
    thumbnail_url: Optional[str] = None
    preview_url: Optional[str] = None

    folder_name: Optional[str] = None
    tags: Optional[List[str]] = None

    status: Optional[FileStatusEnum] = None

    approved_by: Optional[UUID] = None
    approved_at: Optional[datetime] = None

    expires_at: Optional[datetime] = None

    is_public: Optional[bool] = None
    is_downloadable: Optional[bool] = None
    is_editable: Optional[bool] = None
    is_confidential: Optional[bool] = None

    access_level: Optional[AccessLevelEnum] = None

    remarks: Optional[str] = None

    file_metadata: Optional[dict] = None


# ------------------------------------------------------------------
# Response
# ------------------------------------------------------------------

class FileResponse(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    file_id: UUID

    file_name: str
    display_name: str
    unique_file_name: str

    description: Optional[str]

    file_type: str
    file_extension: str
    file_size: int

    checksum: str

    storage_provider: str
    storage_path: str

    public_url: Optional[str]
    thumbnail_url: Optional[str]
    preview_url: Optional[str]

    category: str
    module_name: str
    entity_name: str
    entity_id: UUID

    folder_name: Optional[str]
    tags: Optional[List[str]]

    version: int
    is_latest: bool

    status: FileStatusEnum

    uploaded_by: UUID
    approved_by: Optional[UUID]

    approved_at: Optional[datetime]
    expires_at: Optional[datetime]

    download_count: int
    last_downloaded_at: Optional[datetime]

    is_public: bool
    is_downloadable: bool
    is_editable: bool
    is_confidential: bool

    access_level: AccessLevelEnum

    remarks: Optional[str]

    file_metadata: Optional[dict]

    created_at: str
    updated_at: str