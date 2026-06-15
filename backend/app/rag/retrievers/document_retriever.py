from app.rag.embeddings.embedding_model import (
    EmbeddingModel
)


class DocumentRetriever:

    def __init__(self, vector_store):

        self.vector_store = vector_store

    def retrieve(
        self,
        query: str,
        top_k: int = 5
    ):

        query_embedding = (
            EmbeddingModel.embed_query(query)
        )

        chunks, distances = self.vector_store.search(query_embedding, k=top_k)

        
        return {
            "chunks": chunks,
            "distances": distances
        }