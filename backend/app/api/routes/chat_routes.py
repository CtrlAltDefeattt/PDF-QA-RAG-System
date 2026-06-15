import os
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.schemas.chat import ChatRequest, ChatResponse
from app.services.rag_service import RAGService
from app.rag.vectorstore.faiss_store import FAISSStore

router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)

def get_rag_service() -> RAGService:
    """
    Dependency provider to safely load your persistent FAISS index 
    and inject it directly into the RAG Service.
    """
    INDEX_PATH = "app/indexes/faiss.index"
    METADATA_PATH = "app/indexes/metadata.pkl"
    
    if not os.path.exists(INDEX_PATH) or not os.path.exists(METADATA_PATH):
        raise HTTPException(
            status_code=500, 
            detail="Vector index files missing on server. Please upload and index documents first."
        )
        
    store = FAISSStore(embedding_dimension=384)
    store.load(INDEX_PATH, METADATA_PATH)
    return RAGService(vector_store=store)


@router.post("", response_model=ChatResponse)
def chat(
    request: ChatRequest,
    db: Session = Depends(get_db),
    rag_service: RAGService = Depends(get_rag_service)
):
    """
    Accepts a user question, searches the indexed PDF vector database,
    gathers context, runs anti-hallucination prompts via Gemini, and returns citations.
    """
    try:
        # Execute the verified RAG pipeline
        result = rag_service.ask(request.question)
        
        # Returns: {"answer": ..., "confidence_score": ..., "sources": [...]}
        return result
        
    except Exception as e:
        raise HTTPException(
            status_code=500, 
            detail=f"RAG Service execution failure: {str(e)}"
        )