from app.database.base import Base
from app.database.session import engine

from app.models.document import Document
from app.models.chat_session import ChatSession
from app.models.chat_history import ChatHistory


def create_tables():
    print("Tables registered:", Base.metadata.tables.keys())
    Base.metadata.create_all(bind=engine)