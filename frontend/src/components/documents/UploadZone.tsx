import { Upload } from "lucide-react";
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
  };

  return (
    <label className="block cursor-pointer">
      <input
        type="file"
        hidden
        accept=".pdf"
        onChange={handleUpload}
      />

      <div className="border border-dashed border-zinc-700 rounded-xl p-6 text-center hover:border-blue-500">
        <Upload
          className="mx-auto mb-3"
          size={24}
        />

        <p>Upload PDF</p>
      </div>
    </label>
  );
};

export default UploadZone;