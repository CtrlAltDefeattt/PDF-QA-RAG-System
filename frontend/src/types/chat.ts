export interface ChatRequest {
  session_id: number;
  question: string;
}

export interface SourceCitation {
  document_id: number;
  page: number;
  text: string;
}

export interface ChatResponse {
  answer: string;
  confidence_score: number;
  sources: SourceCitation[];
}

export type MessageRole = "user" | "assistant";

export interface Message {
  id: string;
  role: MessageRole;
  content: string;
  confidence?: number;
  sources?: SourceCitation[];
  status?: "streaming" | "error";
}
