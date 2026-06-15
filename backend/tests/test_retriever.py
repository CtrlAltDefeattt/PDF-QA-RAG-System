import sys
import os

# Ensure the app root is recognized by Python
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from langchain_community.vectorstores import FAISS
from app.rag.embeddings.embedding_service import EmbeddingService
from app.rag.retrievers.document_retriever import DocumentRetriever

def run_test():
    # 1. Point to your existing local document index folder (Document ID 1)
    index_path = "app/indexes/doc_1"
    
    if not os.path.exists(index_path):
        print(f"Index directory not found at {index_path}. Please run your FAISS test first!")
        return

    print("--- 1. Loading Local Vector Store ---")
    embeddings = EmbeddingService.get_embedding_model()
    
    # This explicitly creates and defines the 'store' object your tutorial needs!
    store = FAISS.load_local(index_path, embeddings, allow_dangerous_deserialization=True)

    print("--- 2. Initializing Retriever with Store ---")
    # This matches your tutorial's syntax layout completely
    retriever = DocumentRetriever(store)

    print("--- 3. Executing Query Retrieval ---")
    results = retriever.retrieve("What is supervised learning?")

    print("\n================ RETRIEVED CHUNKS ================")
    print(results)
    print("==================================================")

if __name__ == "__main__":
    run_test()