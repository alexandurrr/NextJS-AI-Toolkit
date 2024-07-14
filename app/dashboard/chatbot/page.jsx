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
      const userMessage = { role: "user", content, image };
      const newMessages = [systemMessage, ...messages, userMessage];
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      try {
        const { text } = await generateText({
          model,
          messages: newMessages,
          attachments: image ? [{ type: "image", content: image }] : [],
        });

        setMessages((prev) => [...prev, { role: "assistant", content: text }]);
      } catch (error) {
        console.error("Error sending message:", error);
        if (error.message.includes("image")) {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "Sorry, there was an error processing the image. Please try again.",
            },
          ]);
        } else {
          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content: "An error occurred. Please try again later.",
            },
          ]);
        }
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
        // 5MB limit
        alert("Image size should be less than 5MB");
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        console.log("File read result:", reader.result); // Debugging log
        setSelectedImage(reader.result);
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
                  <p>{message.content}</p>
                  {message.role === "user" && message.image && (
                    <img
                      src={message.image}
                      alt="User uploaded"
                      style={{
                        maxWidth: "100%",
                        borderRadius: "10px",
                        marginTop: "10px",
                      }}
                    />
                  )}
                </div>
              </div>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>
        <form onSubmit={handleSubmit} className={styles.inputForm}>
          <div className={styles.inputWrapper}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className={styles.input}
            />
            <label className={styles.fileInputLabel}>
              {selectedImage ? "Image selected" : "Upload Image"}
              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className={styles.fileInput}
              />
            </label>
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={styles.sendButton}
          >
            {isLoading ? "Sending..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatbotPage;
