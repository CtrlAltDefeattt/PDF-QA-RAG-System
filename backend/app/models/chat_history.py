from sqlalchemy import String
from sqlalchemy import Text
from sqlalchemy import ForeignKey
from sqlalchemy import Float
from sqlalchemy import DateTime
from sqlalchemy import func

from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.database.base import Base


class ChatHistory(Base):
    __tablename__ = "chat_history"

    id: Mapped[int] = mapped_column(
        primary_key=True
    )

    session_id: Mapped[int] = mapped_column(
        ForeignKey("chat_sessions.id")
    )

    question: Mapped[str] = mapped_column(
        Text
    )

    answer: Mapped[str] = mapped_column(
        Text
    )

    confidence_score: Mapped[float] = mapped_column(
        Float,
        default=0.0
    )

    created_at: Mapped[DateTime] = mapped_column(
        DateTime(timezone=True),
        server_default=func.now()
    )