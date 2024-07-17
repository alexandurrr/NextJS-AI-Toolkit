"use client";

import { useState } from "react";
import { ChatProvider } from "../../context/ChatContext";
import ChatMessages from "./ChatMessages";
import ChatInput from "./ChatInput";
import styles from "./chatbot.module.css";

export default function ChatComponent() {
  const [selectedImage, setSelectedImage] = useState(null);

  return (
    <ChatProvider>
      <div className={styles.pageContainer}>
        <div className={styles.chatContainer}>
          <ChatMessages />
          <ChatInput
            selectedImage={selectedImage}
            setSelectedImage={setSelectedImage}
          />
        </div>
      </div>
    </ChatProvider>
  );
}
