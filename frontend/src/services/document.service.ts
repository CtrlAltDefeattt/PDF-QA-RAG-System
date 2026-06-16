import api from "./api";
import { Document } from "../types/document";

export const documentService = {
  async getDocuments(): Promise<Document[]> {
    const { data } = await api.get("/documents");
    return data;
  },

  async uploadDocument(file: File) {
    const formData = new FormData();
    formData.append("file", file);

    const { data } = await api.post(
      "/documents/upload",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      }
    );

    return data;
  },

  async deleteDocument(id: number) {
    const { data } = await api.delete(`/documents/${id}`);
    return data;
  }
};