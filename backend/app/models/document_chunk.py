from sqlalchemy import Integer
from sqlalchemy import Text
from sqlalchemy import ForeignKey

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.database.base import Base


class DocumentChunk(Base):
    __tablename__ = "document_chunks"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True
    )

    document_id: Mapped[int] = mapped_column(
        ForeignKey("documents.id"),
        nullable=False
    )

    page_number: Mapped[int] = mapped_column(
        Integer
    )

    chunk_index: Mapped[int] = mapped_column(
        Integer
    )

    chunk_text: Mapped[str] = mapped_column(
        Text
    )