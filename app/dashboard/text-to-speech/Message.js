import styles from "./TextToSpeech.module.css";
import { IoPlayOutline, IoPauseOutline } from "react-icons/io5";

export default function Message({ message, isPlaying, onTogglePlayPause }) {
  return (
    <div
      className={`${styles.messageWrapper} ${
        message.type === "user"
          ? styles.userMessageWrapper
          : styles.botMessageWrapper
      }`}
    >
      <div
        className={`${styles.messageContainer} ${
          message.type === "user" ? styles.userMessage : styles.botMessage
        } ${
          isPlaying && message.type !== "user"
            ? styles.highlightedChatMessage
            : ""
        }`}
      >
        <div className={styles.messageContent}>
          <p className={isPlaying ? styles.highlighted : ""}>
            {message.content}
          </p>
        </div>
        {message.type === "bot" && message.audioUrl && (
          <button
            onClick={onTogglePlayPause}
            className={`${styles.playButton} ${
              isPlaying ? styles.playing : ""
            }`}
          >
            {isPlaying ? <IoPauseOutline /> : <IoPlayOutline />}
          </button>
        )}
        <div className={styles.timestamp}>{message.timestamp}</div>
      </div>
    </div>
  );
}
