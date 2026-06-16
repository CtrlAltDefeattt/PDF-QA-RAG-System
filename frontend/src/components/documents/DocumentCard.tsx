import {
  FileText,
  Trash2
} from "lucide-react";
import { Document } from "../../types/document";

interface Props {
  document: Document;
  onDelete: (id: number) => void;
}

const statusColor = {
  uploaded: "bg-blue-500",
  processing: "bg-yellow-500",
  indexed: "bg-green-500",
  failed: "bg-red-500"
};

const DocumentCard = ({
  document,
  onDelete
}: Props) => {
  return (
    <div className="bg-zinc-900 rounded-xl p-4 border border-zinc-800">
      <div className="flex justify-between">
        <div className="flex gap-3">
          <FileText size={20} />

          <div>
            <h3 className="font-medium">
              {document.filename}
            </h3>

            <p className="text-xs text-zinc-400">
              {(document.file_size / 1024).toFixed(
                2
              )}{" "}
              KB
            </p>
          </div>
        </div>

        <button
          onClick={() => onDelete(document.id)}
        >
          <Trash2 size={16} />
        </button>
      </div>

      <div className="mt-3">
        <span
          className={`inline-flex items-center px-2 py-1 rounded-full text-xs ${statusColor[document.status]}`}
        >
          {document.status}
        </span>
      </div>
    </div>
  );
};

export default DocumentCard;