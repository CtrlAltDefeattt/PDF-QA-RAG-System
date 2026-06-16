class PromptBuilder:

    @staticmethod
    def build_rag_prompt(question: str, chunks: list, history: str = "") -> str:
        # Combine the retrieved text blocks cleanly
        context = "\n\n".join(chunk["text"] for chunk in chunks)
        conversation_history = history if history.strip() else "No previous conversation history."

        return f"""You are a helpful conversational AI assistant answering questions using document context and past chat history.

CRITICAL GUARDRAILS:
1. Answer the question using ONLY the facts explicitly provided in the CONTEXT below.
2. You are highly encouraged to rephrase, fix punctuation spacing, and synthesize the bullet points from the context into clean, readable sentences.
3. Do NOT use outside global knowledge or assume details not present in the text.
4. If the context does not contain enough information to address the question, reply exactly with:
'I could not find this information in the uploaded documents.'

CONVERSATION HISTORY:
{conversation_history}

CONTEXT:
{context}

QUESTION:
{question}

ANSWER:"""