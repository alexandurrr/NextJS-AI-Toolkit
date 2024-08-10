import axios from "axios";
import { useTextToSpeech } from "../context/TextToSpeechContext";
import { useState } from "react";

export function useTextToSpeechGenerator() {
  const { chatMessages, setChatMessages, isLoading, setIsLoading } =
    useTextToSpeech();
  const [inputText, setInputText] = useState("");

  const generateResponse = async (text) => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/text-to-speech", {
        text,
      });

      setChatMessages((prevMessages) => [
        ...prevMessages,
        { type: "user", content: text },
        { type: "bot", content: response.data.textResponse },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setChatMessages((prevMessages) => [
        ...prevMessages,
        {
          type: "error",
          content: "An error occurred while processing the request.",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    inputText,
    setInputText,
    generateResponse,
    isLoading,
    chatMessages,
  };
}
