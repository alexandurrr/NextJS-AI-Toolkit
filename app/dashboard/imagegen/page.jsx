"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import styles from "./ImageGen.module.css";
import { useImageGenerator } from "../../hooks/useImageGenerator";

export default function ImageGenerator() {
  const { prompt, setPrompt, generateImage, isLoading, generatedImages } =
    useImageGenerator();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [generatedImages]);

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
          {generatedImages.map((image, index) => (
            <div
              key={index}
              className={`${styles.messageWrapper} ${
                index % 2 === 0
                  ? styles.userMessageWrapper
                  : styles.botMessageWrapper
              }`}
            >
              <div
                className={`${styles.messageContainer} ${
                  index % 2 === 0 ? styles.userMessage : styles.botMessage
                }`}
              >
                <div className={styles.messageContent}>
                  {index % 2 === 0 ? (
                    <p>{image.prompt}</p>
                  ) : (
                    <>
                      <div className={styles.imageContainer}>
                        <Image
                          src={image.imageUrl}
                          alt={image.prompt}
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
