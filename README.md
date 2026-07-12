# 📄 PDF QA RAG System

> An end-to-end Retrieval-Augmented Generation (RAG) application that enables users to interact with PDF documents through natural language conversations using semantic search and Large Language Models.

![Python](https://img.shields.io/badge/Python-3.11+-blue)
![FastAPI](https://img.shields.io/badge/FastAPI-Backend-green)
![React](https://img.shields.io/badge/React-Frontend-61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-Latest-blue)
![LangChain](https://img.shields.io/badge/LangChain-RAG-orange)
![FAISS](https://img.shields.io/badge/FAISS-VectorDB-red)
![License](https://img.shields.io/badge/License-MIT-yellow)

---

## 📖 Overview

PDF QA RAG System is a full-stack AI application that allows users to upload PDF documents and ask questions in natural language. Instead of relying solely on an LLM's internal knowledge, the application retrieves the most relevant document sections using semantic search and provides context-aware answers.

The project demonstrates the complete workflow of a modern Retrieval-Augmented Generation (RAG) pipeline, including document ingestion, embedding generation, vector search, prompt engineering, and response generation.

---

# ✨ Features

- 📄 Upload one or multiple PDF documents
- 🔍 Automatic text extraction
- ✂️ Intelligent document chunking
- 🧠 Semantic embedding generation
- 📚 FAISS vector database indexing
- 💬 Conversational question answering
- 🎯 Context-aware responses
- 📑 Source chunk retrieval
- 🕒 Chat history management
- ⚡ FastAPI REST APIs
- 🎨 Modern React + TypeScript UI

---

# 🛠 Tech Stack

## Backend

- Python
- FastAPI
- SQLAlchemy
- SQLite / PostgreSQL
- LangChain
- FAISS
- Sentence Transformers

## Frontend

- React
- TypeScript
- Tailwind CSS
- Axios

## AI Stack

- Google Gemini API
- Retrieval-Augmented Generation (RAG)
- Semantic Search
- Dense Vector Retrieval
- Sentence Embeddings

---

# 🏗 Architecture

```text
                     ┌────────────────────┐
                     │   Upload PDF(s)    │
                     └─────────┬──────────┘
                               │
                               ▼
                  ┌────────────────────────┐
                  │   Text Extraction      │
                  └─────────┬──────────────┘
                            │
                            ▼
                  ┌────────────────────────┐
                  │ Document Chunking      │
                  └─────────┬──────────────┘
                            │
                            ▼
                  ┌────────────────────────┐
                  │ Generate Embeddings    │
                  └─────────┬──────────────┘
                            │
                            ▼
                  ┌────────────────────────┐
                  │ FAISS Vector Database  │
                  └─────────┬──────────────┘
                            │
              User Question │
                            ▼
                  ┌────────────────────────┐
                  │ Similarity Search      │
                  └─────────┬──────────────┘
                            │
                            ▼
                  ┌────────────────────────┐
                  │ Retrieve Context       │
                  └─────────┬──────────────┘
                            │
                            ▼
                  ┌────────────────────────┐
                  │ Google Gemini LLM      │
                  └─────────┬──────────────┘
                            │
                            ▼
                     Contextual Answer
```

---

# 📂 Project Structure

```
PDF-QA-RAG/
│
├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── models/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── requirements.txt
│   └── .env
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── hooks/
│   │   ├── services/
│   │   └── App.tsx
│   │
│   ├── package.json
│   └── vite.config.ts
│
└── README.md
```

---

# ⚙️ How It Works

### 1️⃣ Upload Documents

The user uploads one or more PDF documents.

↓

### 2️⃣ Document Processing

The system extracts text from PDFs.

↓

### 3️⃣ Chunking

Documents are split into overlapping chunks.

↓

### 4️⃣ Embedding Generation

Sentence Transformers convert each chunk into dense vector embeddings.

↓

### 5️⃣ Vector Indexing

Embeddings are stored inside a FAISS vector database.

↓

### 6️⃣ Ask Questions

The user submits a natural language query.

↓

### 7️⃣ Semantic Retrieval

The query embedding is compared against stored vectors to retrieve the most relevant document chunks.

↓

### 8️⃣ Answer Generation

Retrieved context is provided to Google Gemini, which generates an accurate, grounded response.

---

# 🚀 Installation

## Clone Repository

```bash
git clone https://github.com/yourusername/pdf-qa-rag.git

cd pdf-qa-rag
```

---

## Backend Setup

```bash
cd backend

python -m venv venv

# Windows
venv\Scripts\activate

# Linux / macOS
source venv/bin/activate

pip install -r requirements.txt

uvicorn app.main:app --reload
```

---

## Frontend Setup

```bash
cd frontend

npm install

npm run dev
```

---

# 🔑 Environment Variables

Create a `.env` file inside the backend directory.

```env
GOOGLE_API_KEY=your_google_gemini_api_key

DATABASE_URL=sqlite:///database.db

SECRET_KEY=your_secret_key
```

---

# 📡 API Endpoints

| Method | Endpoint | Description |
|---------|----------|-------------|
| POST | `/upload` | Upload PDF documents |
| POST | `/chat` | Ask questions |
| GET | `/documents` | List uploaded PDFs |
| DELETE | `/documents/{id}` | Delete document |
| GET | `/history` | Retrieve chat history |

---

# 💡 Example Questions

- Summarize this research paper.
- What are the key findings?
- Explain the methodology used.
- What conclusions does the author draw?
- Compare chapter 2 and chapter 5.
- List all important dates mentioned.
- Give me a concise summary.

---

# 🎯 Skills Demonstrated

- Retrieval-Augmented Generation (RAG)
- Large Language Models (LLMs)
- Semantic Search
- Vector Databases
- Embedding Models
- Prompt Engineering
- FastAPI Development
- React + TypeScript
- REST API Design
- SQLAlchemy ORM
- Database Design
- Full-Stack AI Development

---

# 🔮 Future Enhancements

- Hybrid Search (BM25 + Dense Retrieval)
- OCR support for scanned PDFs
- Multi-user authentication
- Streaming responses
- PDF annotations
- Document citations with page numbers
- Docker deployment
- Kubernetes support
- Cloud deployment
- Redis caching

---

# 📷 Screenshots

Add screenshots here after deployment.

Example:

```
Home Page

Upload PDF

Chat Interface

Response with Sources
```

---

# 🤝 Contributing

Contributions are welcome!

If you'd like to improve the project, feel free to fork the repository, create a feature branch, and submit a pull request.

---

# 📜 License

This project is licensed under the MIT License.

---

# 👨‍💻 Author

**Prajwal Vitkar**

AI & Data Science Engineering Student

- 💼 LinkedIn: https://linkedin.com/in/prajwalvitkar
- 💻 GitHub: https://github.com/CtrlAltDefeattt

---

⭐ If you found this project useful, consider giving it a star!
