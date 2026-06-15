import os
from sqlalchemy.orm import Session
from app.models.document import Document
from app.models.document_chunk import DocumentChunk
from app.rag.loaders.pdf_loader import PDFLoader
from app.rag.pipelines.document_processor import DocumentProcessor
from app.rag.embeddings.embedding_model import EmbeddingModel
from app.rag.vectorstore.faiss_store import FAISSStore

class IngestionService:

    @staticmethod
    def process_document(document_id: int, db: Session) -> dict:
        """
        Orchestrates the entire document processing pipeline end-to-end:
        Extracts, Cleans, Chunks, Saves to DB, Embeds, Updates FAISS, and Persists to Disk.
        """
        print(f"⚙️ Starting Ingestion Pipeline for Document ID: {document_id}")
        
        # --- STEP 1: Get Document from Database ---
        document = db.query(Document).filter(Document.id == document_id).first()
        if not document:
            raise ValueError(f"❌ Error: Document with ID {document_id} not found in database.")

        # --- STEP 2: Update Status to Processing ---
        document.status = "processing"
        db.commit()

        try:
            # --- STEP 3: Extract Text from PDF File ---
            if not os.path.exists(document.filepath):
                raise FileNotFoundError(f"PDF file missing on disk at: {document.filepath}")
                
            pdf_data = PDFLoader.extract_text(document.filepath)
            # Expected output structure: {"total_pages": X, "pages": [{"page_num": 1, "text": "..."}, ...]}

            # --- STEP 4: Generate Document Chunks ---
            # Automatically chunks your raw pages using your document processor logic
            chunks = DocumentProcessor.process_pages(pdf_data["pages"], document.id)
            # Expected output structure: [{"document_id": X, "page": Y, "chunk_index": Z, "text": "..."}, ...]

            # --- STEP 5: Save Chunks to SQLite Database ---
            # This maintains text audit records and provides reliable relational metadata tracking
            for chunk in chunks:
                chunk_record = DocumentChunk(
                    document_id=document.id,
                    page_number=chunk["page"],
                    chunk_index=chunk["chunk_index"],
                    chunk_text=chunk["text"]
                )
                db.add(chunk_record)
            db.commit()

            # --- STEP 6: Generate Mathematical Vectors/Embeddings ---
            texts = [chunk["text"] for chunk in chunks]
            embeddings = EmbeddingModel.embed_texts(texts)

            # --- STEP 7: Store Vectors & Metadata Map into FAISS Store ---
            # Paths to your persistent vector storage files
            INDEX_PATH = "app/indexes/faiss.index"
            METADATA_PATH = "app/indexes/metadata.pkl"
            
            # Ensure the directory exists
            os.makedirs(os.path.dirname(INDEX_PATH), exist_ok=True)

            # Initialize your vector store and load previous states if they exist
            vector_store = FAISSStore(embedding_dimension=384)
            if os.path.exists(INDEX_PATH) and os.path.exists(METADATA_PATH):
                vector_store.load(INDEX_PATH, METADATA_PATH)

            # Append the new records to the existing vector store
            vector_store.add(embeddings, chunks)

            # --- STEP 8: Save/Persist updated FAISS Index to disk ---
            vector_store.save(INDEX_PATH, METADATA_PATH)

            # --- STEP 9: Update Status to Complete/Indexed ---
            document.status = "indexed"
            document.total_pages = pdf_data["total_pages"]
            db.commit()
            
            print(f"🎉 Successfully Indexed Document ID {document_id}! Chunks created: {len(chunks)}")
            return {"status": "success", "chunks_processed": len(chunks)}

        except Exception as e:
            # Fallback Guardrail: Mark the document status as failed if anything crashes
            db.rollback()
            document.status = "failed"
            db.commit()
            print(f"❌ Ingestion Pipeline Failed for Document ID {document_id}. Error: {str(e)}")
            raise e