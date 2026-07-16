import { Trash2 } from "lucide-react";
import { Session } from "../../types/session";

interface Props {
  session: Session;
  active: boolean;
  onSelect: (id: number) => void;
  onDelete: (id: number) => void;
}

const SessionItem = ({
  session,
  active,
  onDelete,
  onSelect
}: Props) => {
  return (
    <div
      className={`flex cursor-pointer items-center justify-between gap-3 rounded-xl border p-3 transition ${
        active
          ? "border-cyan-500/40 bg-cyan-500/15 text-cyan-100"
          : "border-zinc-800 bg-zinc-900 text-zinc-200 hover:border-zinc-700"
      }`}
      onClick={() => onSelect(session.id)}
    >
      <span className="min-w-0 truncate text-sm font-medium">
        {session.session_name}
      </span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(session.id);
        }}
        className="shrink-0 rounded-md p-1 text-zinc-500 transition hover:bg-zinc-800 hover:text-red-300"
        aria-label={`Delete ${session.session_name}`}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

export default SessionItem;
