import { useEffect, useRef } from "react";
import { Message } from "../../types/chat";
import ChatMessage from "./ChatMessage";

interface Props {
  messages: Message[];
  loading: boolean;
}

const ChatWindow = ({
  messages,
  loading
}: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages]);

  if (!messages.length) {
    return (
      <div className="h-full flex items-center justify-center text-zinc-500">
        Ask a question about your documents.
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-6 py-6">
      <div className="space-y-5">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
          />
        ))}

        {loading && (
          <div className="text-zinc-500">
            Assistant is thinking...
          </div>
        )}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

export default ChatWindow;