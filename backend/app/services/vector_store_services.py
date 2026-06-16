import os
import logging
from typing import Optional
# Assuming FAISSStore is your custom wrapper around faiss
from app.rag.vectorstore.faiss_store import FAISSStore 

logger = logging.getLogger(__name__)

class VectorStoreService:
    _instance: Optional[FAISSStore] = None

    @classmethod
    def initialize(cls, index_path: str, metadata_path: str):
        """
        Initializes the FAISS store singleton at startup.
        """
        if cls._instance is not None:
            logger.warning("VectorStoreService already initialized.")
            return cls._instance

        logger.info("Initializing production FAISS Vector Store...")
        store = FAISSStore()
        
        # Check if an existing index exists to load it
        if os.path.exists(index_path) and os.path.exists(metadata_path):
            logger.info(f"Loading existing FAISS index from {index_path}")
            store.load(index_path, metadata_path)
        else:
            logger.warning("No existing FAISS index found. Starting with an empty index.")
            # If your FAISSStore needs explicit initialization when empty, do it here
            
        cls._instance = store
        return cls._instance

    @classmethod
    def get_instance(cls) -> FAISSStore:
        """
        Provides the globally shared, thread-safe FAISS instance to incoming requests.
        """
        if cls._instance is None:
            raise RuntimeError(
                "VectorStoreService has not been initialized! "
                "Call VectorStoreService.initialize() at app startup."
            )
        return cls._instance