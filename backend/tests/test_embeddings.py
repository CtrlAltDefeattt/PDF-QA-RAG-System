from app.rag.embeddings.embedding_model import (
    EmbeddingModel
)

vector = EmbeddingModel.embed_query(
    "What is machine learning?"
)

print(vector.shape)