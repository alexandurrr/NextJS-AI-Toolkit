import { useState } from "react";
import { useImageGen } from "../context/ImageGenContext";

export function useImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const [model, setModel] = useState("dall-e-2"); // Default to DALL-E 2
  const { generatedImages, setGeneratedImages, isLoading, setIsLoading } =
    useImageGen();

  const generateImage = async () => {
    setIsLoading(true);
    try {
      const response = await fetch("/api/imagegen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ prompt, model }),
      });
      if (!response.ok) {
        throw new Error("Failed to generate image");
      }
      const data = await response.json();

      setGeneratedImages((prevImages) => [
        ...prevImages,
        { type: "user", content: prompt },
        { type: "ai", content: data.imageUrl },
      ]);
    } catch (error) {
      console.error("Error generating image:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    prompt,
    setPrompt,
    model,
    setModel,
    generateImage,
    isLoading,
    generatedImages,
  };
}
