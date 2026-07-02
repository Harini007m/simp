from app.repositories.base import BaseRepository
from app.models.academic.batch import Batch
from app.modules.batch.schemas import BatchCreate, BatchUpdate


class BatchRepository(BaseRepository[Batch, BatchCreate, BatchUpdate]):
    def __init__(self):
        super().__init__(
            Batch,
            search_fields=[
                "name",
                "code",
            ],
        )