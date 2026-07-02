from sqlalchemy.ext.asyncio import AsyncSession

from app.repositories.base import BaseRepository

from app.models.internships.application import Application
from app.modules.application.schemas import (
    ApplicationCreate,
    ApplicationUpdate,
)


class ApplicationRepository(
    BaseRepository[
        Application,
        ApplicationCreate,
        ApplicationUpdate,
    ]
):
    def __init__(self, db: AsyncSession):
        self.db = db
        super().__init__(
            Application,
            search_fields=[
                "status",
                "feedback",
            ],
        )