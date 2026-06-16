import api from "./api";
import { CreateSessionRequest, Session } from "../types/session";

export const sessionService = {
  async getSessions(): Promise<Session[]> {
    const { data } = await api.get("/sessions");
    return data;
  },

  async createSession(payload: CreateSessionRequest) {
    const { data } = await api.post("/sessions", payload);
    return data;
  },

  async deleteSession(id: number) {
    const { data } = await api.delete(`/sessions/${id}`);
    return data;
  }
};