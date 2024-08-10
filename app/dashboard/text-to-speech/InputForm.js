import { useState } from "react";
import styles from "./TextToSpeech.module.css";

export default function InputForm({ isLoading, onSubmit }) {
  const [inputText, setInputText] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputText.trim()) {
      onSubmit(inputText);
      setInputText("");
    }
  };

  return (
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
  );
}
