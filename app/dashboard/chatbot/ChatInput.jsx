"use client";

import { useState } from "react";
import { useChat } from "../../context/ChatContext";
import { useImageUpload } from "../../hooks/useImageUpload";
import { useSendMessage } from "../../hooks/useSendMessage";
import styles from "./chatbot.module.css";

export default function ChatInput({ selectedImage, setSelectedImage }) {
  const [input, setInput] = useState("");
  const { isLoading } = useChat();
  const { handleImageChange } = useImageUpload(setSelectedImage);
  const { sendMessage } = useSendMessage();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() || selectedImage) {
      sendMessage(input, selectedImage);
      setInput("");
      setSelectedImage(null);
    }
  };

  const getPlaceholderText = () => {
    return isLoading ? "Alex is typing..." : "Type your message...";
  };

  return (
    <form onSubmit={handleSubmit} className={styles.inputForm}>
      <div className={styles.inputWrapper}>
        <label className={styles.fileInputLabel}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 0 1-8.49-8.49l9.19-9.19a4 4 0 0 1 5.66 5.66l-9.2 9.19a2 2 0 0 1-2.83-2.83l8.49-8.48"></path>
          </svg>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className={styles.fileInput}
            disabled={isLoading}
          />
        </label>
        {isLoading && (
          <div className={styles.typingIndicator}>
            <span></span>
            <span></span>
            <span></span>
          </div>
        )}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={getPlaceholderText()}
          className={styles.input}
          disabled={isLoading}
        />
        <button
          type="submit"
          disabled={isLoading}
          className={styles.sendButton}
        >
          {isLoading ? "..." : "Send"}
        </button>
      </div>
      {selectedImage && (
        <div className={styles.imagePreview}>
          <img src={`data:image/jpeg;base64,${selectedImage}`} alt="Preview" />
          <button
            onClick={() => setSelectedImage(null)}
            className={styles.removeImage}
          >
            X
          </button>
        </div>
      )}
    </form>
  );
}
