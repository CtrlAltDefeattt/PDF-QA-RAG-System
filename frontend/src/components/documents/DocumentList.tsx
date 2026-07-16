import { useDocuments } from "../../hooks/useDocuments";
import DocumentCard from "./DocumentCard";

const DocumentList = () => {
  const { documents, remove } =
    useDocuments();

  if (documents.isLoading) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-400">
        Loading documents...
      </div>
    );
  }

  if (documents.isError) {
    return (
      <div className="rounded-lg border border-red-500/30 bg-red-950/30 p-3 text-sm text-red-100">
        Could not load documents.
      </div>
    );
  }

  if (!documents.data?.length) {
    return (
      <div className="rounded-lg border border-zinc-800 bg-zinc-900 p-3 text-sm text-zinc-500">
        No PDFs uploaded yet.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {documents.data.map((doc) => (
        <DocumentCard
          key={doc.id}
          document={doc}
          onDelete={(id) =>
            remove.mutate(id)
          }
        />
      ))}
    </div>
  );
};

export default DocumentList;
