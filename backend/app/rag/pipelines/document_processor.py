from app.rag.cleaners.text_cleaner import TextCleaner
from app.rag.chunkers.text_chunker import TextChunker

class DocumentProcessor:
    @staticmethod
    def process_pages(pages, document_id):
        chunks = []
        chunk_counter = 0
        for page_data in pages:
            page_num = page_data["page"]
            text = TextCleaner.clean(page_data["text"])
            page_chunks = TextChunker.split_text(text)
            
            for chunk in page_chunks:
                chunks.append({
                    "document_id": document_id,
                    "page": page_num,
                    "chunk_index": chunk_counter,
                    "text": chunk
                })
                chunk_counter += 1
        return chunks