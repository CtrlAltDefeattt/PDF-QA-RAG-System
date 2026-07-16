import { Loader2, Upload } from "lucide-react";
import { ChangeEvent } from "react";
import { useDocuments } from "../../hooks/useDocuments";

const UploadZone = () => {
  const { upload } = useDocuments();

  const handleUpload = (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const file = e.target.files?.[0];

    if (!file) return;

    upload.mutate(file);
    e.target.value = "";
  };

  return (
    <label
      className={`block ${
        upload.isPending
          ? "cursor-not-allowed opacity-70"
          : "cursor-pointer"
      }`}
    >
      <input
        type="file"
        hidden
        accept=".pdf"
        disabled={upload.isPending}
        onChange={handleUpload}
      />

      <div className="rounded-xl border border-dashed border-zinc-700 bg-zinc-900/60 p-5 text-center transition hover:border-cyan-500">
        {upload.isPending ? (
          <Loader2
            className="mx-auto mb-3 animate-spin text-cyan-300"
            size={24}
          />
        ) : (
          <Upload
            className="mx-auto mb-3 text-zinc-300"
            size={24}
          />
        )}

        <p className="text-sm font-medium text-zinc-100">
          {upload.isPending
            ? "Indexing PDF..."
            : "Upload PDF"}
        </p>
        <p className="mt-1 text-xs text-zinc-500">
          Files are indexed for retrieval after upload.
        </p>
      </div>
    </label>
  );
};

export default UploadZone;
