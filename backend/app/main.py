import os
from contextlib import asynccontextmanager
from fastapi import FastAPI

from app.core.config import settings
from app.database.init_db import create_tables
from app.api.routes.document_routes import router as document_router


@asynccontextmanager
async def lifespan(app: FastAPI):
    
    os.makedirs(
        settings.UPLOAD_DIR,
        exist_ok=True
    )
    
    create_tables()
    yield


app = FastAPI(
    title=settings.APP_NAME,
    lifespan=lifespan
)

app.include_router(document_router)

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