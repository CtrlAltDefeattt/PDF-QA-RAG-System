from pydantic import BaseModel


class ChatRequest(BaseModel):
    question: str

class SourceResponse(BaseModel):
    document_id: int
    page: int
    text: str

class ChatResponse(BaseModel):
    answer: str
    sources: list[SourceResponse]
    confidence_score: float