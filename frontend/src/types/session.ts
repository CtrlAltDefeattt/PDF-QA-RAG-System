export interface Session {
  id: number;
  session_name: string;
  created_at: string;
}

export interface CreateSessionRequest {
  session_name: string;
}