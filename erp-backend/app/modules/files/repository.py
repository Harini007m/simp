from app.repositories.base import BaseRepository

from app.models.files.models import CommonFile
from app.modules.files.schemas import (
    FileCreate,
    FileUpdate,
)


class FileRepository(
    BaseRepository[
        CommonFile,
        FileCreate,
        FileUpdate,
    ]
):
    def __init__(self):
        super().__init__(
            CommonFile,
            search_fields=[
                "file_name",
                "display_name",
                "category",
                "module_name",
                "entity_name",
                "storage_provider",
                "status",
            ],
        )