from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    APP_NAME: str = "PDF RAG System"

    DATABASE_URL: str

    UPLOAD_DIR: str

    FAISS_INDEX_DIR: str

    GEMINI_API_KEY: str

    class Config:
        env_file = ".env"


settings = Settings()