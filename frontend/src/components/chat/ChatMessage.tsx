import { Message } from "../../types/chat";
import ConfidenceBadge from "./ConfidenceBadge";
import MarkdownContent from "./MarkdownContent";
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
        className={`w-fit max-w-[min(100%,56rem)] rounded-2xl px-4 py-3 shadow-sm ${
          isUser
            ? "bg-cyan-600 text-white"
            : message.status === "error"
              ? "border border-red-500/30 bg-red-950/30 text-red-100"
              : "border border-zinc-800 bg-zinc-900 text-zinc-100"
        }`}
      >
        {isUser ? (
          <div className="whitespace-pre-wrap text-sm leading-6 sm:text-[15px]">
            {message.content}
          </div>
        ) : (
          <MarkdownContent content={message.content} />
        )}

        {!isUser && message.status === "streaming" && (
          <span className="mt-3 inline-flex h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
        )}

        {!isUser &&
          typeof message.confidence === "number" && (
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
