import { useDocuments } from "../../hooks/useDocuments";
import DocumentCard from "./DocumentCard";

const DocumentList = () => {
  const { documents, remove } =
    useDocuments();

  return (
    <div className="space-y-3">
      {documents.data?.map((doc) => (
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