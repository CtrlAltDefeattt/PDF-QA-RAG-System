from sqlalchemy.orm import Session
from app.models.chat_session import ChatSession

class SessionService:
    @staticmethod
    def create_session(session_name: str, db: Session) -> ChatSession:
        session = ChatSession(session_name=session_name)
        db.add(session)
        db.commit()
        db.refresh(session)
        return session

    @staticmethod
    def get_sessions(db: Session):
        return db.query(ChatSession).order_by(ChatSession.created_at.desc()).all()

    @staticmethod
    def delete_session(session_id: int, db: Session) -> bool:
        session = db.query(ChatSession).filter(ChatSession.id == session_id).first()
        if not session:
            return False
        db.delete(session)
        db.commit()
        return True