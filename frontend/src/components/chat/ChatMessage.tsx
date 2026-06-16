import { Message } from "../../types/chat";
import ConfidenceBadge from "./ConfidenceBadge";
import SourcePanel from "./SourcePanel";

interface Props {
  message: Message;
}

const ChatMessage = ({ message }: Props) => {
  const isUser = message.role === "user";

  return (
    <div
      className={`flex ${
        isUser ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-4xl rounded-2xl px-4 py-3 ${
          isUser
            ? "bg-blue-600 text-white"
            : "bg-zinc-900 text-zinc-100"
        }`}
      >
        <div className="whitespace-pre-wrap">
          {message.content}
        </div>

        {!isUser && message.confidence && (
          <div className="mt-4">
            <ConfidenceBadge
              score={message.confidence}
            />
          </div>
        )}

        {!isUser && message.sources && (
          <SourcePanel sources={message.sources} />
        )}
      </div>
    </div>
  );
};

export default ChatMessage;