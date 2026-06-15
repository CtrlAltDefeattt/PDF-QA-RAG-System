from fastapi import APIRouter
from fastapi import UploadFile
from fastapi import File
from fastapi import Depends
from fastapi import HTTPException
from typing import List

from sqlalchemy.orm import Session

from app.database.session import get_db

from app.services.document_service import (
    DocumentService
)
from app.services.ingestion_service import (
    IngestionService
)

from app.schemas.document import (
    DocumentResponse,
    DocumentListResponse
)

router = APIRouter(
    prefix="/documents",
    tags=["Documents"]
)


@router.post(
    "/upload",
    response_model=DocumentResponse
)
async def upload_document(
    file: UploadFile = File(...),
    db: Session = Depends(get_db)
):

    if not file.filename.endswith(".pdf"):
        raise HTTPException(
            status_code=400,
            detail="Only PDF files are allowed"
        )

    document = DocumentService.save_document(
        file=file,
        db=db
    )

    IngestionService.process_document(
        document.id,
        db
    )

    return document

@router.get(
    "",
    response_model=List[DocumentListResponse]
)
def get_documents(
    db: Session = Depends(get_db)
):
    return DocumentService.get_documents(db)

@router.get(
    "/{document_id}",
    response_model=DocumentResponse
)
def get_document(
    document_id: int,
    db: Session = Depends(get_db)
):

    document = (
        DocumentService.get_document_by_id(
            document_id,
            db
        )
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    return document

@router.delete("/{document_id}")
def delete_document(
    document_id: int,
    db: Session = Depends(get_db)
):

    document = (
        DocumentService.delete_document(
            document_id,
            db
        )
    )

    if not document:
        raise HTTPException(
            status_code=404,
            detail="Document not found"
        )

    return {
        "message": "Document deleted"
    }