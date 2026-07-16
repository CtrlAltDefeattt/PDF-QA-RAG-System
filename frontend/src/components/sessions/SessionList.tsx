import { Plus } from "lucide-react";
import { useState } from "react";
import { useSessions } from "../../hooks/useSessions";
import SessionItem from "./SessionItem";

interface Props {
  activeSession?: number;
  onSelect: (id: number) => void;
}

const SessionList = ({
  activeSession,
  onSelect
}: Props) => {
  const [name, setName] = useState("");

  const {
    sessions,
    createSession,
    deleteSession
  } = useSessions();

  const create = () => {
    const sessionName = name.trim();

    if (!sessionName) return;

    createSession.mutate(
      {
        session_name: sessionName
      },
      {
        onSuccess: () => setName("")
      }
    );
  };

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              create();
            }
          }}
          placeholder="New session"
          className="min-w-0 flex-1 rounded-lg border border-zinc-800 bg-zinc-900 px-3 py-2 text-sm outline-none transition focus:border-cyan-500"
        />

        <button
          onClick={create}
          disabled={
            !name.trim() ||
            createSession.isPending
          }
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-cyan-600 text-white transition hover:bg-cyan-500 disabled:cursor-not-allowed disabled:bg-zinc-800 disabled:text-zinc-500"
          aria-label="Create session"
        >
          <Plus size={17} />
        </button>
      </div>

      {sessions.isLoading && (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-400">
          Loading sessions...
        </div>
      )}

      {sessions.isError && (
        <div className="rounded-lg border border-red-500/30 bg-red-950/30 p-3 text-sm text-red-100">
          Could not load sessions.
        </div>
      )}

      {!sessions.isLoading &&
        !sessions.data?.length && (
        <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-500">
          No sessions yet.
        </div>
        )}

      {sessions.data?.map((session) => (
        <SessionItem
          key={session.id}
          session={session}
          active={
            session.id === activeSession
          }
          onSelect={onSelect}
          onDelete={(id) =>
            deleteSession.mutate(id)
          }
        />
      ))}
    </div>
  );
};
export default SessionList;
