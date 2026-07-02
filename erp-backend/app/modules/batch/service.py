from sqlalchemy.ext.asyncio import AsyncSession

from app.models.academic.batch import Batch
from app.modules.batch.repository import BatchRepository
from app.modules.batch.schemas import BatchCreate, BatchUpdate
from app.services.base import BaseCRUDService


class BatchService(BaseCRUDService[Batch, BatchCreate, BatchUpdate]):
    """
    Batch Service

    Provides standard CRUD operations for Batch management.

    Inherited Features:
    - Get Batch
    - Get Multiple Batches
    - Search & Pagination
    - Create Batch
    - Update Batch
    - Delete Batch
    - Audit Logging
    - Transaction Handling
    """

    def __init__(self, db: AsyncSession):
        super().__init__(
            db=db,
            repository=BatchRepository(),
        )