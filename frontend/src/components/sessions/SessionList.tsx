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

  return (
    <div className="space-y-3">
      <div className="flex gap-2">
        <input
          value={name}
          onChange={(e) =>
            setName(e.target.value)
          }
          placeholder="New session"
          className="flex-1 bg-zinc-900 rounded-lg px-3 py-2"
        />

        <button
          onClick={() =>
            createSession.mutate({
              session_name: name
            })
          }
          className="bg-blue-600 px-3 rounded-lg"
        >
          Add
        </button>
      </div>

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