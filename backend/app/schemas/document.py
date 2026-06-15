from pydantic import BaseModel
from datetime import datetime


class DocumentResponse(BaseModel):
    id: int
    filename: str
    file_size: int
    status: str
    created_at: datetime

    model_config = {
        "from_attributes": True
    }

class DocumentListResponse(BaseModel):
    id: int
    filename: str
    file_size: int
    status: str

    model_config = {
        "from_attributes": True
    }