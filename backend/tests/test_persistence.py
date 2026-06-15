import os
import shutil
import numpy as np
from app.rag.vectorstore.faiss_store import FAISSStore

# Define paths for testing
INDEX_DIR = "app/indexes"
INDEX_PATH = os.path.join(INDEX_DIR, "faiss.index")
METADATA_PATH = os.path.join(INDEX_DIR, "metadata.pkl")

# Ensure the index directory exists
os.makedirs(INDEX_DIR, exist_ok=True)

def test_pipeline():
    print("🚀 Starting Persistence Test...")

    # --- STEP 1: Initialize and populate a fresh store ---
    print("\n--- Phase 1: Populating Store ---")
    store = FAISSStore(embedding_dimension=384)
    
    # Generate mock vectors matching your 384-dimension embedding space
    mock_vector_1 = np.random.rand(384).astype('float32')
    mock_vector_2 = np.random.rand(384).astype('float32')
    
    mock_metadata_1 = {"document_id": 1, "page": 2, "text": "Supervised learning uses labeled data."}
    mock_metadata_2 = {"document_id": 1, "page": 5, "text": "Unsupervised learning finds hidden patterns."}

    # MATCHED TO YOUR SIGNATURE: Passing as positional arguments (or correct keywords)
    # Your class converts single/multiple arrays to the proper shape automatically!
    store.add([mock_vector_1], [mock_metadata_1])
    store.add([mock_vector_2], [mock_metadata_2])
    print(f"✅ Added vectors. Current metadata count in memory: {len(store.metadata)}")

    # --- STEP 2: Save to Disk ---
    print("\n--- Phase 2: Saving to Disk ---")
    store.save(INDEX_PATH, METADATA_PATH)
    
    if os.path.exists(INDEX_PATH) and os.path.exists(METADATA_PATH):
        print(f"✅ Success: File written to disk.")
    else:
        print("❌ Error: Files were not written to disk.")
        return

    # --- STEP 3: Simulate Server Shutdown / Wipe Memory ---
    print("\n--- Phase 3: Wiping Memory ---")
    del store  
    print("Memory cleared. Old store instance deleted.")

    # --- STEP 4: Reload from Disk into a New Instance ---
    print("\n--- Phase 4: Reloading Data ---")
    new_store = FAISSStore(embedding_dimension=384)
    new_store.load(INDEX_PATH, METADATA_PATH)
    
    print(f"Reloaded metadata count: {len(new_store.metadata)}")
    
    # Assertions to verify correctness
    assert len(new_store.metadata) == 2, "❌ Error: Metadata length mismatch after reload!"
    assert new_store.metadata[0]["page"] == 2, "❌ Error: Metadata content is corrupted!"
    print("✅ Success: Integrity check passed. Metadata matches perfectly.")

    # --- STEP 5: Verify Search Functionality Still Works ---
    print("\n--- Phase 5: Verifying Search Accuracy ---")
    # Search using the first mock vector to see if it retrieves its matching metadata
    results = new_store.search(mock_vector_1, k=1)
    
    print(f"Search result retrieved: {results}")
    if results and results[0]["page"] == 2:
        print("\n🎉 PASSED: Persistence works flawlessly. Your index survived the 'restart'!")
    else:
        print("\n❌ Error: Search failed or returned wrong metadata after reload.")

if __name__ == "__main__":
    test_pipeline()