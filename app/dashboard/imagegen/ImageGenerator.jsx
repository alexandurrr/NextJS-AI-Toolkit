"use client";

import { useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./ImageGen.module.css";
import { useImageGenerator } from "../../hooks/useImageGenerator";

export default function ImageGenerator() {
  const {
    prompt,
    setPrompt,
    model,
    setModel,
    generateImage,
    isLoading,
    generatedImages,
  } = useImageGenerator();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [generatedImages]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (prompt.trim()) {
      await generateImage();
      setPrompt("");
    }
  };

  const getPlaceholderText = () => {
    return isLoading
      ? "Generating image..."
      : "Describe the image you want to generate...";
  };

  return (
    <div className={styles.pageContainer}>
      <div className={styles.chatContainer}>
        <div className={styles.messages}>
          {generatedImages.map((message, index) => (
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
                  {message.type === "user" ? (
                    <p>{message.content}</p>
                  ) : (
                    <>
                      <div className={styles.imageContainer}>
                        <Image
                          src={message.content}
                          alt="Generated image"
                          width={200}
                          height={200}
                          className={styles.messageImage}
                        />
                      </div>
                      <p>Here's the generated image based on your prompt.</p>
                    </>
                  )}
                </div>
                <div className={styles.timestamp}>
                  {new Date().toLocaleTimeString([], {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </div>
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
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder={getPlaceholderText()}
              className={styles.input}
              disabled={isLoading}
            />
            <div className={styles.modelSelector}>
              <span>DALL-E 2</span>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={model === "dall-e-3"}
                  onChange={(e) =>
                    setModel(e.target.checked ? "dall-e-3" : "dall-e-2")
                  }
                />
                <span className={styles.slider}></span>
              </label>
              <span>DALL-E 3</span>
            </div>
            <button
              type="submit"
              disabled={isLoading || !prompt.trim()}
              className={styles.sendButton}
            >
              {isLoading ? "..." : "Generate"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
