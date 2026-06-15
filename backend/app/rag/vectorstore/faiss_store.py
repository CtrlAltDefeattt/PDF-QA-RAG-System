import os
import pickle
import numpy as np
import faiss

class FAISSStore:

    def __init__(self, embedding_dimension: int = 384):
        """
        Initializes the FAISS Vector Store with standard Cosine Similarity support 
        by leveraging normalized IndexFlatL2 architectures.
        """
        self.embedding_dimension = embedding_dimension
        self.index = faiss.IndexFlatL2(self.embedding_dimension)
        self.metadata = []

    def add(self, embeddings: list, metadata_list: list):
        """
        Normalizes incoming embeddings to unit vectors before appending 
        them to turn a basic L2 search space into a pure Cosine Similarity index.
        """
        np_vectors = np.array(embeddings).astype('float32')
        # Vital tracking constraint: scale to unit vectors
        faiss.normalize_L2(np_vectors)
        
        self.index.add(np_vectors)
        self.metadata.extend(metadata_list)

    def search(self, query_embedding: np.ndarray, k: int = 3):
        """
        Performs a normalized angle/cosine vector search, returning match rows 
        alongside accurate, bounded mathematical similarity distances.
        """
        if self.index is None or self.index.ntotal == 0:
            return [], []

        query_vector = np.array([query_embedding]).astype('float32')
        # Normalize query vector to preserve cosine angle projection
        faiss.normalize_L2(query_vector)
        
        distances, indices = self.index.search(query_vector, k)
        
        results = []
        flat_indices = indices[0]
        flat_distances = distances[0]

        for idx in flat_indices:
            if idx != -1 and idx < len(self.metadata):
                results.append(self.metadata[idx].copy())
                
        return results, flat_distances.tolist()

    def save(self, index_path: str, metadata_path: str):
        """Persists the binary matrix and matching list dictionaries to disk."""
        os.makedirs(os.path.dirname(index_path), exist_ok=True)
        faiss.write_index(self.index, index_path)
        with open(metadata_path, 'wb') as f:
            pickle.dump(self.metadata, f)

    def load(self, index_path: str, metadata_path: str):
        """Loads index weights and relational text contexts from disk storage."""
        if os.path.exists(index_path) and os.path.exists(metadata_path):
            self.index = faiss.read_index(index_path)
            with open(metadata_path, 'rb') as f:
                self.metadata = pickle.load(f)
