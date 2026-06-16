from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List

from app.database.session import get_db
from app.services.session_service import SessionService
from app.schemas.session import CreateSessionRequest, SessionResponse

router = APIRouter(prefix="/sessions", tags=["Sessions"])

@router.post("", response_model=SessionResponse, status_code=status.HTTP_201_CREATED)
def create_session(request: CreateSessionRequest, db: Session = Depends(get_db)):
    return SessionService.create_session(request.session_name, db)

@router.get("", response_model=List[SessionResponse])
def get_sessions(db: Session = Depends(get_db)):
    return SessionService.get_sessions(db)

@router.delete("/{session_id}")
def delete_session(session_id: int, db: Session = Depends(get_db)):
    success = SessionService.delete_session(session_id, db)
    if not success:
        raise HTTPException(status_code=404, detail="Session not found")
    return {"message": "Session deleted successfully"}