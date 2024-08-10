import React from "react";
import styles from "./TextToSpeech.module.css";
import { IoPlayOutline, IoPauseOutline } from "react-icons/io5";

const MessageList = ({ messages, playingMessageIndex, togglePlayPause }) => {
  return (
    <>
      {messages.map((message, index) => (
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
              message.type === "user" ? styles.userMessage : styles.botMessage
            } ${
              playingMessageIndex === index && message.type !== "user"
                ? styles.highlightedChatMessage
                : ""
            }`}
          >
            <div className={styles.messageContent}>
              <p
                className={
                  playingMessageIndex === index ? styles.highlighted : ""
                }
              >
                {message.content}
              </p>
            </div>
            {message.type === "bot" && message.audioUrl && (
              <button
                onClick={() => togglePlayPause(message.audioUrl, index)}
                className={`${styles.playButton} ${
                  playingMessageIndex === index ? styles.playing : ""
                }`}
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
    </>
  );
};

export default MessageList;
