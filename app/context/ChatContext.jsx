"use client";

import { createContext, useContext, useState } from "react";
import { usePersistentState } from "../hooks/usePersistentState";

const ChatContext = createContext();

export function ChatProvider({ children }) {
  const [messages, setMessages] = usePersistentState("chatMessages", []);
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ChatContext.Provider
      value={{ messages, setMessages, isLoading, setIsLoading }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  return useContext(ChatContext);
}
