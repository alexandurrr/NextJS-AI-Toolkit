"use client";

import { createContext, useContext, useState } from "react";
import { usePersistentState } from "../hooks/usePersistentState";

const TextToSpeechContext = createContext();

export function TextToSpeechProvider({ children }) {
  const [chatMessagesClaude, setChatMessagesClaude] = usePersistentState(
    "chatMessagesClaude",
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  return (
    <TextToSpeechContext.Provider
      value={{
        chatMessagesClaude,
        setChatMessagesClaude,
        isLoading,
        setIsLoading,
      }}
    >
      {children}
    </TextToSpeechContext.Provider>
  );
}

export function useTextToSpeech() {
  return useContext(TextToSpeechContext);
}
