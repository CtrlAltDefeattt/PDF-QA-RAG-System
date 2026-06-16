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
      className={`flex justify-between items-center p-3 rounded-xl cursor-pointer ${
        active
          ? "bg-blue-600"
          : "bg-zinc-900"
      }`}
      onClick={() => onSelect(session.id)}
    >
      <span>{session.session_name}</span>

      <button
        onClick={(e) => {
          e.stopPropagation();
          onDelete(session.id);
        }}
      >
        <Trash2 size={14} />
      </button>
    </div>
  );
};

export default SessionItem;