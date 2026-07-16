import {
  ChevronDown,
  ChevronUp,
  FileText
} from "lucide-react";
import { useState } from "react";
import { SourceCitation } from "../../types/chat";

interface Props {
  sources: SourceCitation[];
}

const SourcePanel = ({ sources }: Props) => {
  const [open, setOpen] = useState(true);
  const [expandedSources, setExpandedSources] =
    useState<Set<string>>(new Set());

  if (!sources?.length) return null;

  const toggleSource = (id: string) => {
    setExpandedSources((prev) => {
      const next = new Set(prev);

      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }

      return next;
    });
  };

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-zinc-800 bg-zinc-950/40">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between gap-3 p-3 text-left transition hover:bg-zinc-800/50"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-zinc-300">
          Sources ({sources.length})
        </span>

        {open ? (
          <ChevronUp size={18} />
        ) : (
          <ChevronDown size={18} />
        )}
      </button>

      {open && (
        <div className="space-y-3 border-t border-zinc-800 p-3">
          {sources.map((source, index) => {
            const sourceId = `${source.document_id}-${source.page}-${index}`;

            return (
              <SourceCard
                key={sourceId}
                source={source}
                index={index}
                expanded={expandedSources.has(sourceId)}
                onToggle={() => toggleSource(sourceId)}
              />
            );
          })}
        </div>
      )}
    </div>
  );
};

interface SourceCardProps {
  source: SourceCitation;
  index: number;
  expanded: boolean;
  onToggle: () => void;
}

const SourceCard = ({
  source,
  index,
  expanded,
  onToggle
}: SourceCardProps) => {
  const cleanedText = source.text.replace(/\s+/g, " ").trim();
  const preview =
    cleanedText.length > 220
      ? `${cleanedText.slice(0, 220)}...`
      : cleanedText;

  return (
    <div className="rounded-lg border border-zinc-800 bg-zinc-900/80">
      <button
        onClick={onToggle}
        className="flex w-full items-start justify-between gap-3 p-3 text-left"
      >
        <div className="flex min-w-0 gap-3">
          <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-300">
            <FileText size={16} />
          </div>

          <div className="min-w-0">
            <div className="text-xs font-semibold text-zinc-200">
              Citation {index + 1}
            </div>
            <div className="mt-0.5 text-xs text-zinc-500">
              Document #{source.document_id} - Page {source.page}
            </div>
          </div>
        </div>

        {expanded ? (
          <ChevronUp
            className="mt-1 shrink-0 text-zinc-500"
            size={16}
          />
        ) : (
          <ChevronDown
            className="mt-1 shrink-0 text-zinc-500"
            size={16}
          />
        )}
      </button>

      <p className="border-t border-zinc-800 px-3 pb-3 pt-2 text-sm leading-6 text-zinc-300">
        {expanded ? cleanedText : preview}
      </p>
    </div>
  );
};

export default SourcePanel;
