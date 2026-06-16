import { useMutation } from "@tanstack/react-query";
import { chatService } from "../services/chat.service";

export const useChat = () => {
  return useMutation({
    mutationFn: chatService.sendMessage
  });
};