"use client";

import { useState, useCallback, useRef, useEffect } from "react";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import { usePersistentState } from "../../hooks/usePersistentState";
import styles from "./chatbot.module.css";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: "strict",
});

const model = openai("gpt-4o");

const ChatbotPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = usePersistentState("chatMessages", []);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [messages]);

  const sendMessage = useCallback(
    async (content, image) => {
      setIsLoading(true);
      const systemMessage = {
        role: "system",
        content:
          "You are 'Alex', a witty but efficient AI assistant. You have a dry sense of humor but always prioritize brevity and accuracy in your responses. You occasionally use tech-related puns, but only when they don't interfere with the clarity of your answer. Your goal is to provide the most precise information in the fewest words possible.",
      };

      let userMessage;
      if (image) {
        userMessage = {
          role: "user",
          content: [
            {
              type: "text",
              text: content,
            },
            {
              type: "image_url",
              image_url: {
                url: `data:image/jpeg;base64,${image}`,
              },
            },
          ],
        };
      } else {
        userMessage = {
          role: "user",
          content: content,
        };
      }

      const newMessages = [systemMessage, ...messages, userMessage];
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      try {
        const response = await fetch(
          "https://api.openai.com/v1/chat/completions",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
            },
            body: JSON.stringify({
              model: "gpt-4o",
              messages: newMessages,
              max_tokens: 300,
            }),
          }
        );

        const data = await response.json();
        const assistantMessage = data.choices[0].message.content;

        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: assistantMessage },
        ]);
      } catch (error) {
        console.error("Error sending message:", error);
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "An error occurred. Please try again later.",
          },
        ]);
      } finally {
        setIsLoading(false);
        setSelectedImage(null);
      }
    },
    [messages, setMessages]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim() || selectedImage) {
      sendMessage(input, selectedImage);
      setInput("");
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result.split(",")[1];
        setSelectedImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };
  return (
    <div className={styles.pageContainer}>
      <div className={styles.chatContainer}>
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
                  message.role === "user"
                    ? styles.userMessage
                    : styles.botMessage
                }`}
              >
                <div className={styles.messageContent}>
                  {Array.isArray(message.content) ? (
                    message.content.map((item, i) => {
                      if (item.type === "text") {
                        return <p key={i}>{item.text}</p>;
                      } else if (item.type === "image_url") {
                        return (
                          <img
                            key={i}
                            src={item.image_url.url}
                            alt="User uploaded"
                            style={{
                              maxWidth: "100%",
                              borderRadius: "10px",
                              marginBottom: "10px",
                            }}
                          />
                        );
                      }
                      return null;
                    })
                  ) : (
                    <p>{message.content}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
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
              />
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className={styles.input}
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
              <img
                src={`data:image/jpeg;base64,${selectedImage}`}
                alt="Preview"
              />
              <button
                onClick={() => setSelectedImage(null)}
                className={styles.removeImage}
              >
                ×
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default ChatbotPage;
