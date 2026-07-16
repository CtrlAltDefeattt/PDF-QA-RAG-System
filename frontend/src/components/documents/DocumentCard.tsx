import {
  FileText,
  Trash2
} from "lucide-react";
import {
  Document,
  DocumentStatus
} from "../../types/document";

interface Props {
  document: Document;
  onDelete: (id: number) => void;
}

const statusColor: Record<DocumentStatus, string> = {
  uploaded:
    "bg-cyan-500/10 text-cyan-200 border-cyan-500/20",
  processing:
    "bg-amber-500/10 text-amber-200 border-amber-500/20",
  indexed:
    "bg-emerald-500/10 text-emerald-200 border-emerald-500/20",
  failed:
    "bg-red-500/10 text-red-200 border-red-500/20"
};

const DocumentCard = ({
  document,
  onDelete
}: Props) => {
  return (
    <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-4">
      <div className="flex justify-between gap-3">
        <div className="flex min-w-0 gap-3">
          <FileText
            className="mt-0.5 shrink-0 text-cyan-300"
            size={20}
          />

          <div className="min-w-0">
            <h3 className="truncate text-sm font-medium text-zinc-100">
              {document.filename}
            </h3>

            <p className="text-xs text-zinc-500">
              {formatFileSize(document.file_size)}
            </p>
          </div>
        </div>

        <button
          onClick={() => onDelete(document.id)}
          className="h-7 w-7 shrink-0 rounded-md p-1 text-zinc-500 transition hover:bg-zinc-800 hover:text-red-300"
          aria-label={`Delete ${document.filename}`}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-3">
        <span
          className={`inline-flex items-center rounded-full border px-2 py-1 text-xs font-medium ${statusColor[document.status]}`}
        >
          {document.status}
        </span>
      </div>
    </div>
  );
};

const formatFileSize = (bytes: number) => {
  if (bytes < 1024 * 1024) {
    return `${(bytes / 1024).toFixed(1)} KB`;
  }

  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
};

export default DocumentCard;
