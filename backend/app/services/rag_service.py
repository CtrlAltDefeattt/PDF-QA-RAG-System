import logging
import time
import re
import math
from google.genai.errors import ServerError, APIError
from app.rag.retrievers.document_retriever import DocumentRetriever
from app.rag.prompts.prompt_builder import PromptBuilder
from app.rag.generators.gemini_generator import GeminiGenerator
from sqlalchemy.orm import Session
from app.models.chat_history import ChatHistory
from app.services.vector_store_services import VectorStoreService

logger = logging.getLogger(__name__)

class RAGService:
    def __init__(self, vector_store):
        self.retriever = DocumentRetriever(vector_store)
        self.generator = GeminiGenerator()
        self.vector_store = VectorStoreService.get_instance()

    
    def _rewrite_query_with_history(self, question: str, history: str) -> str:
        """
        Uses Gemini to turn a conversational follow-up question into a standalone 
        search query if chat history exists.
        """
        if not history.strip():
            return question

        rewrite_prompt = f"""
Given the following chat history and a follow-up question, rewrite the follow-up question into a standalone question that contains all necessary context to be searched in a document index. 
Do NOT answer the question. Just return the rewritten question.

CHAT HISTORY:
{history}

FOLLOW-UP QUESTION:
{question}

STANDALONE QUESTION:"""

        try:
            # Generate the context-heavy question using your existing generator
            rewritten_question = self.generator.generate(rewrite_prompt)
            return rewritten_question.strip()
        except Exception as e:
            logger.warning(f"Failed to rewrite query, falling back to original: {e}")
            return question
        
    def _get_recent_history(self, session_id: int, db: Session, limit: int = 5) -> str:
        
        history_records = (
            db.query(ChatHistory)
            .filter(ChatHistory.session_id == session_id)
            .order_by(ChatHistory.created_at.asc()) # Get them in chronological order
            .limit(limit)
            .all()
        )
        
        history_text = ""
        for record in history_records:
            history_text += f"User: {record.question}\nAssistant: {record.answer}\n\n"
        return history_text
    
    def ask(self,session_id: int, question: str,db: Session) -> dict:
        
        conversation_history = self._get_recent_history(session_id, db, limit=5)
        context_rich_question = self._rewrite_query_with_history(question, conversation_history)

        search_query = self._normalize_query(context_rich_question)
        logger.info(
            "Original question=%r context_question=%r search_query=%r",
            question,
            context_rich_question,
            search_query,
        )

        # 2. Fetch retrieval results using the clean keyword vector
        retrieval_result = self.retriever.retrieve(search_query, top_k=3)
        chunks = retrieval_result["chunks"]
        distances = retrieval_result["distances"]
        
        if not chunks:
            return {
                "answer": "I could not find any relevant information in the uploaded documents.",
                "sources": [],
                "confidence_score": 0.0
            }
            
        # 3. Compute math-backed confidence via exponential decay
        avg_distance = sum(distances) / len(distances)
        confidence = round(1 - (avg_distance / 2), 4)
        
        # 4. Fire-walled Threshold Check
        CONFIDENCE_THRESHOLD = 0.50  # Perfectly calibrated for normalized text
        if confidence < CONFIDENCE_THRESHOLD:
            return {
                "answer": "I could not find this information in the uploaded documents.",
                "sources": [],
                "confidence_score": confidence
            }
        
        prompt = PromptBuilder.build_rag_prompt(
            question=question, 
            chunks=chunks, 
            history=conversation_history
        )
        
        max_retries = 3
        delay = 2
        for attempt in range(max_retries):
            try:
                answer = self.generator.generate(prompt)
                new_history = ChatHistory(
                    session_id=session_id,
                    question=question,
                    answer=answer,
                    confidence_score=confidence
                )
                db.add(new_history)
                db.commit()
                return {
                    "answer": answer,
                    "sources": chunks,
                    "confidence_score": confidence
                }
            except ServerError as e:
                if "503" in str(e) and attempt < max_retries - 1:
                    time.sleep(delay)
                    delay *= 2
                    continue
                raise e
            except APIError as e:
                return {
                    "answer": f"Google API Error: {e.message}",
                    "sources": [],
                    "confidence_score": 0.0
                }
            
    def _normalize_query(self, query: str) -> str:
        """
        Strips conversational framing phrases to convert an inquiry 
        into a declarative keyword structure matching document notes.
        """
        lowered = query.lower().strip()
        # Remove common conversational prefixes
        lowered = re.sub(r'^(explain|what is|tell me about|show me|define|give me information on)\s+', '', lowered)
        # Remove trailing question marks
        lowered = re.sub(r'\?+$', '', lowered)
        return lowered.strip()        
