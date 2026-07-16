import { Sparkles } from "lucide-react";
import { useEffect, useRef } from "react";
import { Message } from "../../types/chat";
import ChatMessage from "./ChatMessage";

interface Props {
  messages: Message[];
  loading: boolean;
  hasActiveSession: boolean;
  onExampleSelect: (prompt: string) => void;
}

const examplePrompts = [
  "Summarize this document in 5 bullet points.",
  "What are the most important interview questions in this PDF?",
  "Create a quick study guide from the uploaded document.",
  "What evidence supports the main recommendation?"
];

const ChatWindow = ({
  messages,
  loading,
  hasActiveSession,
  onExampleSelect
}: Props) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({
      behavior: "smooth"
    });
  }, [messages, loading]);

  if (!messages.length) {
    return (
      <div className="h-full overflow-y-auto px-4 py-8 sm:px-6">
        <div className="mx-auto flex min-h-full max-w-4xl items-center">
          <div className="w-full">
            <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-cyan-500/20 bg-cyan-500/10 px-3 py-1 text-xs font-medium text-cyan-200">
              <Sparkles size={14} />
              HyperRAG Engine
            </div>

            <h2 className="max-w-3xl text-3xl font-semibold tracking-tight text-white sm:text-5xl">
              Ask sharper questions. Get cited answers from your PDFs.
            </h2>

            <p className="mt-4 max-w-2xl text-sm leading-6 text-zinc-400 sm:text-base">
              Upload a document, choose a session, and use one of these prompts to start an evidence-backed conversation.
            </p>

            {!hasActiveSession && (
              <div className="mt-5 rounded-lg border border-amber-500/20 bg-amber-500/10 px-4 py-3 text-sm text-amber-100">
                Create or select a session before asking your first question.
              </div>
            )}

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {examplePrompts.map((prompt) => (
                <button
                  key={prompt}
                  disabled={!hasActiveSession || loading}
                  onClick={() => onExampleSelect(prompt)}
                  className="rounded-xl border border-zinc-800 bg-zinc-900 p-4 text-left text-sm leading-6 text-zinc-200 transition hover:border-cyan-500/50 hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-4 py-5 sm:px-6">
      <div className="mx-auto max-w-5xl space-y-5">
        {messages.map((message) => (
          <ChatMessage
            key={message.id}
            message={message}
          />
        ))}

        {loading && <ThinkingState />}

        <div ref={bottomRef} />
      </div>
    </div>
  );
};

const ThinkingState = () => {
  return (
    <div className="flex justify-start">
      <div className="w-fit max-w-lg rounded-2xl border border-zinc-800 bg-zinc-900 px-4 py-3">
        <div className="mb-3 flex items-center gap-2 text-sm text-zinc-300">
          <span className="h-2 w-2 animate-pulse rounded-full bg-cyan-300" />
          Searching documents and composing an answer
        </div>
        <div className="h-1.5 overflow-hidden rounded-full bg-zinc-800">
          <div className="h-full w-1/2 animate-[progress_1.3s_ease-in-out_infinite] rounded-full bg-cyan-400" />
        </div>
      </div>
    </div>
  );
};

export default ChatWindow;
