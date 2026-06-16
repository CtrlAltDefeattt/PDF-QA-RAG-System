import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { sessionService } from "../services/session.service";

export const useSessions = () => {
  const queryClient = useQueryClient();

  const sessions = useQuery({
    queryKey: ["sessions"],
    queryFn: sessionService.getSessions
  });

  const createSession = useMutation({
    mutationFn: sessionService.createSession,
    onSuccess: () => {
      toast.success("Session created");
      queryClient.invalidateQueries({
        queryKey: ["sessions"]
      });
    }
  });

  const deleteSession = useMutation({
    mutationFn: sessionService.deleteSession,
    onSuccess: () => {
      toast.success("Session removed");
      queryClient.invalidateQueries({
        queryKey: ["sessions"]
      });
    }
  });

  return {
    sessions,
    createSession,
    deleteSession
  };
};