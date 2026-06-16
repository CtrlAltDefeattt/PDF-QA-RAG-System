import api from "./api";
import { ChatRequest, ChatResponse } from "../types/chat";

export const chatService = {
  async sendMessage(
    payload: ChatRequest
  ): Promise<ChatResponse> {
    const { data } = await api.post("/chat", payload);
    return data;
  }
};