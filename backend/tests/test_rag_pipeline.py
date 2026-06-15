import os
from dotenv import load_dotenv
from app.rag.vectorstore.faiss_store import FAISSStore
from app.services.rag_service import RAGService

def test_end_to_end_rag():
    print("🏗️ Initializing End-to-End RAG Pipeline Test...")

    # 1. Define paths to your existing persistent test files
    INDEX_DIR = "app/indexes"
    INDEX_PATH = os.path.join(INDEX_DIR, "faiss.index")
    METADATA_PATH = os.path.join(INDEX_DIR, "metadata.pkl")

    if not os.path.exists(INDEX_PATH) or not os.path.exists(METADATA_PATH):
        print("❌ Error: Persistent FAISS files not found. Please run your persistence test first to generate them!")
        return

    # 2. Load your persistent store
    print("Loading persistent FAISS index and metadata...")
    store = FAISSStore(embedding_dimension=384)
    store.load(INDEX_PATH, METADATA_PATH)
    
    # 3. Instantiate the RAG Service
    rag = RAGService(vector_store=store)
    
    # --- TEST 1: In-Context Question (Updated for Document 4) ---
    print("\n--- 🎯 Test 1: Querying In-Context Data ---")
    query_1 = "What is the function of the inference engine?"  # ◄ Change this
    print(f"User Query: '{query_1}'")
    
    response_1 = rag.ask(query_1)
    
    print("\n🤖 Gemini Answer:")
    print(response_1["answer"])
    print("\n🔍 Sources Cited:")
    for source in response_1["sources"]:
        print(f" - Document {source.get('document_id')}, Page {source.get('page')}: \"{source.get('text')}\"")

    # --- TEST 2: Out-of-Context Question (Hallucination Guardrail) ---
    print("\n--- 🛡️ Test 2: Asking an Out-of-Context Question ---")
    query_2 = "What is the capital city of France?"
    print(f"User Question: '{query_2}'")
    
    response_2 = rag.ask(query_2)
    
    print("\n🤖 Gemini Answer:")
    print(response_2["answer"])

if __name__ == "__main__":
    # Load environment variables from .env to ensure your GEMINI_API_KEY is available
    load_dotenv()
    test_end_to_end_rag()