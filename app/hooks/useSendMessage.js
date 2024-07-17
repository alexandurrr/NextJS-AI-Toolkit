import { useChat } from "../context/ChatContext";

export function useSendMessage() {
  const { messages, setMessages, setIsLoading } = useChat();

  const sendMessage = async (content, image) => {
    setIsLoading(true);
    const systemMessage = {
      role: "system",
      content:
        "You are 'Alex', a witty but efficient AI assistant. You have a dry sense of humor but always prioritize brevity and accuracy in your responses. You occasionally use tech-related puns, but only when they don't interfere with the clarity of your answer. Your goal is to provide the most precise information in the fewest words possible. Make sure to limit token usage as much as possible",
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
        timestamp: Date.now(),
      };
    } else {
      userMessage = {
        role: "user",
        content: content,
        timestamp: Date.now(),
      };
    }

    const newMessages = [systemMessage, ...messages, userMessage];
    setMessages((prevMessages) => [...prevMessages, userMessage]);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages: newMessages,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(
          `HTTP error! status: ${response.status}, body: ${errorText}`
        );
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      const assistantMessage = {
        role: "assistant",
        content: data.message,
        timestamp: Date.now(),
      };

      setMessages((prev) => [...prev, assistantMessage]);
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
    }
  };

  return { sendMessage };
}
