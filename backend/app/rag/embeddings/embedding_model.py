from sentence_transformers import SentenceTransformer


class EmbeddingModel:

    _model = None

    @classmethod
    def get_model(cls):

        if cls._model is None:
            cls._model = SentenceTransformer(
                "sentence-transformers/all-MiniLM-L6-v2"
            )

        return cls._model

    @classmethod
    def embed_texts(
        cls,
        texts: list[str]
    ):

        model = cls.get_model()

        return model.encode(
            texts,
            convert_to_numpy=True
        )

    @classmethod
    def embed_query(
        cls,
        query: str
    ):

        model = cls.get_model()

        return model.encode(
            query,
            convert_to_numpy=True
        )