import { useState } from "react";
import { nanoid } from "nanoid";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import ChatInput from "../components/chat/ChatInput";
import ChatWindow from "../components/chat/ChatWindow";

import { Message } from "../types/chat";
import { useChat } from "../hooks/useChat";

const STORAGE_KEY = "active-session";

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  const [activeSession, setActiveSession] =
    useState<number | undefined>(() => {
      const saved =
        localStorage.getItem(STORAGE_KEY);

      return saved ? Number(saved) : undefined;
    });

  const chatMutation = useChat();

  const handleSelectSession = (
    sessionId: number
  ) => {
    setActiveSession(sessionId);

    localStorage.setItem(
      STORAGE_KEY,
      String(sessionId)
    );
  };

  const sendMessage = async (
    question: string
  ) => {
    if (!activeSession) return;

    const userMessage: Message = {
      id: nanoid(),
      role: "user",
      content: question
    };

    setMessages((prev) => [
      ...prev,
      userMessage
    ]);

    try {
      const response =
        await chatMutation.mutateAsync({
          session_id: activeSession,
          question
        });

      const assistantMessage: Message = {
        id: nanoid(),
        role: "assistant",
        content: response.answer,
        confidence:
          response.confidence_score,
        sources: response.sources
      };

      setMessages((prev) => [
        ...prev,
        assistantMessage
      ]);
    } catch {
      const errorMessage: Message = {
        id: nanoid(),
        role: "assistant",
        content:
          "Unable to process request."
      };

      setMessages((prev) => [
        ...prev,
        errorMessage
      ]);
    }
  };

  return (
    <div className="h-screen bg-zinc-950 text-zinc-100 flex">

      <Sidebar
        activeSession={activeSession}
        onSelectSession={
          handleSelectSession
        }
      />

      <main className="flex-1 flex flex-col">

        <Header />

        <div className="flex-1 overflow-hidden">
          <ChatWindow
            messages={messages}
            loading={chatMutation.isPending}
          />
        </div>

        <ChatInput
          loading={chatMutation.isPending}
          onSend={sendMessage}
        />

      </main>

    </div>
  );
};

export default Dashboard;