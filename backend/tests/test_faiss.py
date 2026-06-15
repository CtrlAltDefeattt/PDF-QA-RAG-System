from app.rag.embeddings.embedding_model import (
    EmbeddingModel
)

from app.rag.vectorstore.faiss_store import (
    FAISSStore
)

texts = [
    "Machine Learning",
    "Deep Learning",
    "Computer Vision"
]

vectors = (
    EmbeddingModel.embed_texts(texts)
)

store = FAISSStore()

store.add(
    vectors,
    [{"text": t} for t in texts]
)

query_vector = (
    EmbeddingModel.embed_query(
        "What is ML?"
    )
)

results = store.search(
    query_vector
)

print(results)