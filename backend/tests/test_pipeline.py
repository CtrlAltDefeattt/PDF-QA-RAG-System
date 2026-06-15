from app.rag.loaders.pdf_loader import PDFLoader
from app.rag.pipelines.document_processor import (
    DocumentProcessor
)

result = PDFLoader.extract_text(
    "app/uploads/sample.pdf"
)

chunks = (
    DocumentProcessor.process_pages(
        result["pages"],
        document_id=1
    )
)

print(len(chunks))

print(chunks[0])