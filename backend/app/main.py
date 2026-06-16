import os
from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.core.config import settings
from app.database.init_db import create_tables
from app.api.routes.document_routes import router as document_router
from app.api.routes import chat_routes
# Import the new VectorStoreService
from app.services.vector_store_services import VectorStoreService
from app.api.routes.session_routes import router as session_router

@asynccontextmanager
async def lifespan(app: FastAPI):
    # 1. Ensure upload directory exists
    os.makedirs(
        settings.UPLOAD_DIR,
        exist_ok=True
    )

    # 2. Initialize database tables
    create_tables()

    # 3. Initialize the production FAISS Vector Store exactly once at startup
    # (Adjust paths if they are defined differently in your settings)
    INDEX_PATH = "app/indexes/faiss.index"
    METADATA_PATH = "app/indexes/metadata.pkl"
    VectorStoreService.initialize(index_path=INDEX_PATH, metadata_path=METADATA_PATH)

    yield


app = FastAPI(
    title=settings.APP_NAME,
    lifespan=lifespan
)
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(document_router)
app.include_router(chat_routes.router)
app.include_router(session_router)

@app.get("/")
def root():
    return {
        "message": "PDF RAG System Running"
    }


@app.get("/health")
def health():
    return {
        "status": "healthy"
    }