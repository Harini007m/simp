import uuid
from typing import Optional
from sqlalchemy.orm import Mapped, mapped_column
from sqlalchemy import String, Text, Boolean, Date, ForeignKey
from app.models.core.mixins import BaseModel


class PersonalTask(BaseModel):
    __tablename__ = 'prod_personal_tasks'
    __table_args__ = {'comment': 'Personal to-do tasks for each user'}

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('auth_users.id', ondelete='CASCADE'), index=True, nullable=False
    )
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    completed: Mapped[bool] = mapped_column(Boolean, default=False, nullable=False)
    due_date: Mapped[Optional[str]] = mapped_column(String(50))


class StickyNote(BaseModel):
    __tablename__ = 'prod_sticky_notes'
    __table_args__ = {'comment': 'Personal sticky notes for quick jotting'}

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('auth_users.id', ondelete='CASCADE'), index=True, nullable=False
    )
    content: Mapped[str] = mapped_column(Text, nullable=False)
    color: Mapped[str] = mapped_column(String(20), default='yellow', nullable=False)


class Bookmark(BaseModel):
    __tablename__ = 'prod_bookmarks'
    __table_args__ = {'comment': 'Personal bookmarked external links'}

    user_id: Mapped[uuid.UUID] = mapped_column(
        ForeignKey('auth_users.id', ondelete='CASCADE'), index=True, nullable=False
    )
    title: Mapped[str] = mapped_column(String(500), nullable=False)
    url: Mapped[str] = mapped_column(String(2000), nullable=False)
    category: Mapped[str] = mapped_column(String(100), default='Work', nullable=False)
