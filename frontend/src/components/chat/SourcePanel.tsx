import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { SourceCitation } from "../../types/chat";

interface Props {
  sources: SourceCitation[];
}

const SourcePanel = ({ sources }: Props) => {
  const [open, setOpen] = useState(true);

  if (!sources?.length) return null;

  return (
    <div className="mt-4 border border-zinc-800 rounded-xl">
      <button
        onClick={() => setOpen(!open)}
        className="w-full flex justify-between items-center p-3"
      >
        <span className="font-medium">
          Sources ({sources.length})
        </span>

        {open ? (
          <ChevronUp size={18} />
        ) : (
          <ChevronDown size={18} />
        )}
      </button>

      {open && (
        <div className="space-y-3 p-3 border-t border-zinc-800">
          {sources.map((source, index) => (
            <div
              key={index}
              className="bg-zinc-900 rounded-lg p-3"
            >
              <div className="text-xs text-zinc-400 mb-2">
                Document #{source.document_id} • Page{" "}
                {source.page}
              </div>

              <p className="text-sm text-zinc-300">
                {source.text}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SourcePanel;