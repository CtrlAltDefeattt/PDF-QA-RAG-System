from sqlalchemy import String
from sqlalchemy import Integer
from sqlalchemy import DateTime
from sqlalchemy import func

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.database.base import Base


class Document(Base):
    __tablename__ = "documents"

    id: Mapped[int] = mapped_column(
        Integer,
        primary_key=True,
        index=True
    )

    filename: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    filepath: Mapped[str] = mapped_column(
        String,
        nullable=False
    )

    file_size: Mapped[int] = mapped_column(
        Integer
    )

    total_pages: Mapped[int] = mapped_column(
        Integer,
        default=0
    )

    status: Mapped[str] = mapped_column(
        String,
        default="uploaded"
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )