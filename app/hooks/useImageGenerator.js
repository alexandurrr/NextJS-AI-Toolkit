import { useState } from "react";
import { useImageGen } from "../context/ImageGenContext";

export function useImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const { generatedImages, setGeneratedImages, isLoading, setIsLoading } =
    useImageGen();

  const generateImage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/imagegen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate image");
      }
      const data = await response.json();

      // Add both the user prompt and the AI response to the chat
      setGeneratedImages((prevImages) => [
        ...prevImages,
        { type: "user", content: prompt },
        { type: "ai", content: data.imageUrl },
      ]);
    } catch (error) {
      console.error("Error generating image:", error);
      // Handle the error (e.g., show an error message to the user)
    } finally {
      setIsLoading(false);
    }
  };

  return { prompt, setPrompt, generateImage, isLoading, generatedImages };
}
