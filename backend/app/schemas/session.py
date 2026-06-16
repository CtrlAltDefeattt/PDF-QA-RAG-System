from pydantic import BaseModel
from datetime import datetime


class CreateSessionRequest(BaseModel):
    session_name: str


class SessionResponse(BaseModel):
    id: int
    session_name: str
    created_at: datetime

    class Config:
        from_attributes = True