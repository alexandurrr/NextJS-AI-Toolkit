"use client";

import { useRef, useEffect, useState } from "react";
import styles from "./TextToSpeech.module.css";
import { useTextToSpeech } from "../../context/TextToSpeechContext";
import axios from "axios";
import { IoPlayOutline, IoPauseOutline } from "react-icons/io5";

export default function TextToSpeechGenerator() {
  const { chatMessagesClaude, setChatMessagesClaude, isLoading, setIsLoading } =
    useTextToSpeech();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef(null);
  const audioRef = useRef(null);
  const [lastPlayedMessageIndex, setLastPlayedMessageIndex] = useState(() => {
    const savedIndex = localStorage.getItem("lastPlayedMessageIndex");
    return savedIndex !== null ? parseInt(savedIndex) : -1;
  });
  const [playingMessageIndex, setPlayingMessageIndex] = useState(null); // Track the index of the currently playing message

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }

    if (chatMessagesClaude.length > lastPlayedMessageIndex + 1) {
      const latestMessage = chatMessagesClaude[chatMessagesClaude.length - 1];
      if (latestMessage.type === "bot" && latestMessage.audioUrl) {
        playAudio(latestMessage.audioUrl, chatMessagesClaude.length - 1);
        setLastPlayedMessageIndex(chatMessagesClaude.length - 1);
        localStorage.setItem(
          "lastPlayedMessageIndex",
          chatMessagesClaude.length - 1
        );
      }
    }
  }, [chatMessagesClaude, lastPlayedMessageIndex]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      await generateResponse(inputText);
      setInputText("");
    }
  };

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

  const playAudio = (audioUrl, index) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(audioUrl);
    audioRef.current.play();
    setPlayingMessageIndex(index);

    audioRef.current.onended = () => {
      setPlayingMessageIndex(null);
    };
  };

  const togglePlayPause = (audioUrl, index) => {
    if (playingMessageIndex === index) {
      audioRef.current.pause();
      setPlayingMessageIndex(null);
    } else {
      playAudio(audioUrl, index);
    }
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {chatMessagesClaude.map((message, index) => (
            <div
              key={index}
              className={`${styles.messageWrapper} ${
                message.type === "user"
                  ? styles.userMessageWrapper
                  : styles.botMessageWrapper
              }`}
            >
              <div
                className={`${styles.messageContainer} ${
                  message.type === "user"
                    ? styles.userMessage
                    : styles.botMessage
                }`}
              >
                <div className={styles.messageContent}>
                  <p>{message.content}</p>
                </div>
                {message.type === "bot" && message.audioUrl && (
                  <button
                    onClick={() => togglePlayPause(message.audioUrl, index)}
                    className={styles.playButton}
                  >
                    {playingMessageIndex === index ? (
                      <IoPauseOutline />
                    ) : (
                      <IoPlayOutline />
                    )}
                  </button>
                )}
                <div className={styles.timestamp}>{message.timestamp}</div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <div className={styles.inputWrapper}>
            {isLoading && (
              <div className={styles.typingIndicator}>
                <span></span>
                <span></span>
                <span></span>
              </div>
            )}
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              placeholder={
                isLoading ? "Generating response..." : "Type your message..."
              }
              className={styles.input}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading || !inputText.trim()}
              className={styles.sendButton}
            >
              {isLoading ? "..." : "Send"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
