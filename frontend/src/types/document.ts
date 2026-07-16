export type DocumentStatus =
  | "uploaded"
  | "processing"
  | "indexed"
  | "failed";

export interface Document {
  id: number;
  filename: string;
  file_size: number;
  status: DocumentStatus;
  created_at?: string;
}
