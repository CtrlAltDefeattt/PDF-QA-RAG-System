import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { documentService } from "../services/document.service";

export const useDocuments = () => {
  const queryClient = useQueryClient();

  const documents = useQuery({
    queryKey: ["documents"],
    queryFn: documentService.getDocuments
  });

  const upload = useMutation({
    mutationFn: documentService.uploadDocument,
    onSuccess: () => {
      toast.success("Document uploaded");
      queryClient.invalidateQueries({
        queryKey: ["documents"]
      });
    },
    onError: () => {
      toast.error("Upload failed");
    }
  });

  const remove = useMutation({
    mutationFn: documentService.deleteDocument,
    onSuccess: () => {
      toast.success("Document deleted");
      queryClient.invalidateQueries({
        queryKey: ["documents"]
      });
    }
  });

  return {
    documents,
    upload,
    remove
  };
};