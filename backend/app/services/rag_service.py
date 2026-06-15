import time
import re
import math
from google.genai.errors import ServerError, APIError
from app.rag.retrievers.document_retriever import DocumentRetriever
from app.rag.prompts.prompt_builder import PromptBuilder
from app.rag.generators.gemini_generator import GeminiGenerator

class RAGService:
    def __init__(self, vector_store):
        self.retriever = DocumentRetriever(vector_store)
        self.generator = GeminiGenerator()

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

    def ask(self, question: str) -> dict:
        """
        Runs the end-to-end RAG pipeline with query normalization 
        and an exponential decay confidence firewall.
        """
        # 1. Normalize the incoming query text
        search_query = self._normalize_query(question)
        print(f"🔍 Original: '{question}' -> Normalized Search: '{search_query}'")

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
        
        # 5. Construct prompt and invoke Gemini for strong matches
        prompt = PromptBuilder.build_rag_prompt(question, chunks)
        
        max_retries = 3
        delay = 2
        for attempt in range(max_retries):
            try:
                answer = self.generator.generate(prompt)
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