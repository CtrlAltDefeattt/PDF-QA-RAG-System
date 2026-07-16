import { useState } from "react";
import { nanoid } from "nanoid";
import { AxiosError } from "axios";

import Sidebar from "../components/layout/Sidebar";
import Header from "../components/layout/Header";

import ChatInput from "../components/chat/ChatInput";
import ChatWindow from "../components/chat/ChatWindow";

import { Message } from "../types/chat";
import { useChat } from "../hooks/useChat";

const STORAGE_KEY = "active-session";

const Dashboard = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);

  const [activeSession, setActiveSession] =
    useState<number | undefined>(() => {
      const saved =
        localStorage.getItem(STORAGE_KEY);

      return saved ? Number(saved) : undefined;
    });

  const chatMutation = useChat();
  const isResponding =
    chatMutation.isPending || isStreaming;

  const handleSelectSession = (
    sessionId: number
  ) => {
    setActiveSession(sessionId);

    localStorage.setItem(
      STORAGE_KEY,
      String(sessionId)
    );
  };

  const revealAssistantMessage = (
    message: Omit<Message, "id">
  ) => {
    const messageId = nanoid();
    const fullContent = message.content;
    const stepSize = Math.max(
      2,
      Math.ceil(fullContent.length / 110)
    );
    let cursor = 0;

    setIsStreaming(true);
    setMessages((prev) => [
      ...prev,
      {
        ...message,
        id: messageId,
        content: "",
        status: "streaming"
      }
    ]);

    const tick = () => {
      cursor = Math.min(
        fullContent.length,
        cursor + stepSize
      );

      setMessages((prev) =>
        prev.map((item) =>
          item.id === messageId
            ? {
                ...item,
                content: fullContent.slice(0, cursor),
                status:
                  cursor >= fullContent.length
                    ? undefined
                    : "streaming"
              }
            : item
        )
      );

      if (cursor < fullContent.length) {
        window.setTimeout(tick, 12);
      } else {
        setIsStreaming(false);
      }
    };

    window.setTimeout(tick, 80);
  };

  const sendMessage = async (
    question: string
  ) => {
    if (isResponding) return;

    if (!activeSession) {
      setMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: "assistant",
          content:
            "Create or select a session before asking a question.",
          status: "error"
        }
      ]);
      return;
    }

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

      revealAssistantMessage({
        role: "assistant",
        content: response.answer,
        confidence:
          response.confidence_score,
        sources: response.sources
      });
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        {
          id: nanoid(),
          role: "assistant",
          content: getChatErrorMessage(error),
          status: "error"
        }
      ]);
    }
  };

  return (
    <div className="flex h-screen flex-col bg-zinc-950 text-zinc-100 lg:flex-row">

      <Sidebar
        activeSession={activeSession}
        onSelectSession={
          handleSelectSession
        }
      />

      <main className="flex min-h-0 flex-1 flex-col">

        <Header />

        <div className="min-h-0 flex-1 overflow-hidden">
          <ChatWindow
            messages={messages}
            loading={chatMutation.isPending}
            hasActiveSession={Boolean(activeSession)}
            onExampleSelect={sendMessage}
          />
        </div>

        <ChatInput
          loading={isResponding}
          hasActiveSession={Boolean(activeSession)}
          onSend={sendMessage}
        />

      </main>

    </div>
  );
};

const getChatErrorMessage = (error: unknown) => {
  if (error instanceof AxiosError) {
    const detail = error.response?.data?.detail;

    if (typeof detail === "string") {
      return detail;
    }

    return "The backend did not return a valid chat response. Check the API server and try again.";
  }

  return "Unable to process the request. Check the backend logs and try again.";
};

export default Dashboard;
