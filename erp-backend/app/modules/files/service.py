from datetime import datetime, timezone
from uuid import UUID

from fastapi import HTTPException
from sqlalchemy.ext.asyncio import AsyncSession

from app.models.files.models import CommonFile
from app.modules.files.repository import FileRepository
from app.modules.files.schemas import FileCreate, FileUpdate
from app.services.base import BaseCRUDService


class FileService(BaseCRUDService[CommonFile, FileCreate, FileUpdate]):
    def __init__(self, db: AsyncSession):
        super().__init__(db, FileRepository())

    async def approve_file(
        self,
        file_id: UUID,
        approved_by: UUID,
    ) -> CommonFile:
        file = await self.get(file_id)

        file.status = "APPROVED"
        file.approved_by = approved_by
        file.approved_at = datetime.now(timezone.utc)

        self.db.add(file)

        await self.log_audit_event(
            "APPROVE_FILE",
            "CommonFile",
            approved_by,
            new_value={"file_id": str(file.id)},
        )

        await self.commit_transaction()

        return file

    async def increment_download(
        self,
        file_id: UUID,
    ) -> CommonFile:
        file = await self.get(file_id)

        file.download_count += 1
        file.last_downloaded_at = datetime.now(timezone.utc)

        self.db.add(file)
        await self.commit_transaction()

        return file

    async def get_by_module(
        self,
        module_name: str,
    ):
        return await self.repository.get_multi(
            self.db,
            filters={"module_name": module_name},
        )

    async def get_by_entity(
        self,
        entity_id: UUID,
    ):
        return await self.repository.get_multi(
            self.db,
            filters={"entity_id": entity_id},
        )