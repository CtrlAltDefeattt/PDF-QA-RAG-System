import { Send } from "lucide-react";
import { KeyboardEvent, useState } from "react";

interface Props {
  loading: boolean;
  onSend: (message: string) => void;
}

const ChatInput = ({
  loading,
  onSend
}: Props) => {
  const [message, setMessage] = useState("");

  const submit = () => {
    if (!message.trim()) return;

    onSend(message);
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
    <div className="border-t border-zinc-800 p-4">
      <div className="flex gap-3">
        <textarea
          rows={2}
          value={message}
          disabled={loading}
          onChange={(e) =>
            setMessage(e.target.value)
          }
          onKeyDown={handleKeyDown}
          placeholder="Ask about your PDFs..."
          className="flex-1 bg-zinc-900 border border-zinc-700 rounded-xl p-3 resize-none outline-none"
        />

        <button
          disabled={loading}
          onClick={submit}
          className="px-4 rounded-xl bg-blue-600 hover:bg-blue-500"
        >
          <Send size={18} />
        </button>
      </div>
    </div>
  );
};

export default ChatInput;