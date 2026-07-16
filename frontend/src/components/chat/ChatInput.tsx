import { Send } from "lucide-react";
import { KeyboardEvent, useState } from "react";

interface Props {
  loading: boolean;
  hasActiveSession: boolean;
  onSend: (message: string) => void;
}

const ChatInput = ({
  loading,
  hasActiveSession,
  onSend
}: Props) => {
  const [message, setMessage] = useState("");

  const canSend =
    Boolean(message.trim()) &&
    !loading &&
    hasActiveSession;

  const submit = () => {
    if (!canSend) return;

    onSend(message.trim());
    setMessage("");
  };

  const handleKeyDown = (
    e: KeyboardEvent<HTMLTextAreaElement>
  ) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      submit();
    }
  };

  return (
    <div className="border-t border-zinc-800 bg-zinc-950 p-3 sm:p-4">
      <div className="mx-auto flex max-w-5xl gap-3">
        <textarea
          rows={2}
          value={message}
          disabled={loading || !hasActiveSession}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder={
            hasActiveSession
              ? "Ask about your PDFs..."
              : "Create or select a session first"
          }
          className="min-h-[52px] flex-1 resize-none rounded-xl border border-zinc-700 bg-zinc-900 p-3 text-sm leading-6 text-zinc-100 outline-none transition placeholder:text-zinc-500 focus:border-cyan-500 disabled:cursor-not-allowed disabled:opacity-60"
        />

        <button
          disabled={!canSend}
          onClick={submit}
          className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-xl bg-cyan-600 text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
          aria-label="Send message"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
