import os
import uuid

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.document import Document
from app.core.config import settings


class DocumentService:

    @staticmethod
    def save_document(
        file: UploadFile,
        db: Session
    ):

        unique_filename = (
            f"{uuid.uuid4()}_{file.filename}"
        )

        file_path = os.path.join(
            settings.UPLOAD_DIR,
            unique_filename
        )

        with open(file_path, "wb") as buffer:
            buffer.write(file.file.read())

        document = Document(
            filename=file.filename,
            filepath=file_path,
            file_size=os.path.getsize(file_path),
            status="uploaded"
        )

        db.add(document)
        db.commit()
        db.refresh(document)

        return document