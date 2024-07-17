"use client";

import { useRef, useEffect } from "react";
import { useChat } from "../../context/ChatContext";
import styles from "./chatbot.module.css";

export default function ChatMessages() {
  const { messages } = useChat();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  return (
    <div className={styles.messages}>
      {messages.map((message, index) => (
        <div
          key={index}
          className={`${styles.messageWrapper} ${
            message.role === "user"
              ? styles.userMessageWrapper
              : styles.botMessageWrapper
          }`}
        >
          <div
            className={`${styles.messageContainer} ${
              message.role === "user" ? styles.userMessage : styles.botMessage
            }`}
          >
            <div className={styles.messageContent}>
              {Array.isArray(message.content) ? (
                message.content.map((item, i) => {
                  if (item.type === "text") {
                    return <p key={i}>{item.text}</p>;
                  } else if (item.type === "image_url") {
                    return (
                      <div key={i} className={styles.imageContainer}>
                        <img
                          src={item.image_url.url}
                          alt="User uploaded"
                          className={styles.messageImage}
                        />
                      </div>
                    );
                  }
                  return null;
                })
              ) : (
                <p>{message.content}</p>
              )}
            </div>
            {message.timestamp && (
              <div className={styles.timestamp}>
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "numeric",
                  minute: "numeric",
                })}
              </div>
            )}
          </div>
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
}
