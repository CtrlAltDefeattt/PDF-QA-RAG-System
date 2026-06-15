class PromptBuilder:

    @staticmethod
    def build_rag_prompt(question: str, chunks: list) -> str:
        # Combine the retrieved text blocks cleanly
        context = "\n\n".join(chunk["text"] for chunk in chunks)

        return f"""You are an expert document question-answering assistant. Your task is to provide a clear, well-structured answer based strictly on the provided context.

CRITICAL GUARDRAILS:
1. Answer the question using ONLY the facts explicitly provided in the CONTEXT below.
2. You are highly encouraged to rephrase, fix punctuation spacing, and synthesize the bullet points from the context into clean, readable sentences.
3. Do NOT use outside global knowledge or assume details not present in the text.
4. If the context does not contain enough information to address the question, reply exactly with:
'I could not find this information in the uploaded documents.'

CONTEXT:
{context}

QUESTION:
{question}

ANSWER:"""