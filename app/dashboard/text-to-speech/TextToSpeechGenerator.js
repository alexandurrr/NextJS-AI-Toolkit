"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./TextToSpeech.module.css";
import { useTextToSpeech } from "../../context/TextToSpeechContext";
import axios from "axios";
import MessageList from "./MessageList";
import InputForm from "./InputForm";
import useAudio from "./useAudio";

export default function TextToSpeechGenerator() {
  const { chatMessagesClaude, setChatMessagesClaude, isLoading, setIsLoading } =
    useTextToSpeech();
  const [lastPlayedMessageIndex, setLastPlayedMessageIndex] = useState(-1);
  const [isInitialized, setIsInitialized] = useState(false);
  const { playAudio, playingMessageIndex, togglePlayPause } = useAudio();
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const savedIndex = localStorage.getItem("lastPlayedMessageIndex");
    setLastPlayedMessageIndex(savedIndex !== null ? parseInt(savedIndex) : -1);
    setIsInitialized(true);
  }, []);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }

    if (
      isInitialized &&
      chatMessagesClaude.length > lastPlayedMessageIndex + 1
    ) {
      const latestMessage = chatMessagesClaude[chatMessagesClaude.length - 1];
      if (latestMessage.type === "bot" && latestMessage.audioUrl) {
        playAudio(latestMessage.audioUrl, chatMessagesClaude.length - 1);
        setLastPlayedMessageIndex(chatMessagesClaude.length - 1);
        localStorage.setItem(
          "lastPlayedMessageIndex",
          (chatMessagesClaude.length - 1).toString()
        );
      }
    }
  }, [chatMessagesClaude, lastPlayedMessageIndex, isInitialized, playAudio]);

  const generateResponse = async (text) => {
    setIsLoading(true);

    try {
      const response = await axios.post("/api/text-to-speech", {
        text,
      });

      const timestamp = new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
      });

      setChatMessagesClaude((prevMessages) => [
        ...prevMessages,
        { type: "user", content: text, timestamp },
        {
          type: "bot",
          content: response.data.textResponse,
          audioUrl: response.data.audioUrl,
          timestamp,
        },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      const timestamp = new Date().toLocaleTimeString([], {
        hour: "numeric",
        minute: "numeric",
      });
      setChatMessagesClaude((prevMessages) => [
        ...prevMessages,
        {
          type: "error",
          content: "An error occurred while processing the request.",
          timestamp,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.chatContainer}>
        <div className={styles.messages} ref={chatContainerRef}>
          <MessageList
            messages={chatMessagesClaude}
            playingMessageIndex={playingMessageIndex}
            togglePlayPause={togglePlayPause}
          />
        </div>
        <InputForm isLoading={isLoading} onSubmit={generateResponse} />
      </div>
    </div>
  );
}
