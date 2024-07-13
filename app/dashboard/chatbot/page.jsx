"use client";

import { useState, useCallback, useEffect } from "react";
import { createOpenAI } from "@ai-sdk/openai";
import { generateText } from "ai";
import styles from "./chatbot.module.css";
import { usePersistentState } from "../../hooks/usePersistentState";

const openai = createOpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  compatibility: "strict",
});

const model = openai("gpt-4-turbo");

const ChatbotPage = () => {
  const [input, setInput] = useState("");
  const [messages, setMessages] = usePersistentState("chatMessages", []);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("Current messages:", messages);
  }, [messages]);

  const sendMessage = useCallback(
    async (content) => {
      setIsLoading(true);
      const systemMessage = {
        role: "system",
        content:
          "You are 'Alex', a witty but efficient AI assistant. You have a dry sense of humor but always prioritize brevity and accuracy in your responses. You occasionally use tech-related puns, but only when they don't interfere with the clarity of your answer. Your goal is to provide the most precise information in the fewest words possible.",
      };
      const newMessages = [
        systemMessage,
        ...messages,
        { role: "user", content },
      ];
      setMessages((prevMessages) => [
        ...prevMessages,
        { role: "user", content },
      ]);

      try {
        const { text } = await generateText({
          model,
          messages: newMessages,
        });

        setMessages((prev) => [...prev, { role: "assistant", content: text }]);
      } catch (error) {
        console.error("Error sending message:", error);
      } finally {
        setIsLoading(false);
      }
    },
    [messages, setMessages]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  return (
    <div className={styles.wrapper}>
      <div className={styles.main}>
        <div className={styles.chatContainer}>
          <h1 className={styles.title}>AI Chatbot</h1>
          <div className={styles.messages}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${styles[message.role]}`}
              >
                <strong>{message.role === "user" ? "You" : "AI"}: </strong>
                {message.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className={styles.inputForm}>
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
              className={styles.button}
            >
              {isLoading ? "Sending..." : "Send"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ChatbotPage;
