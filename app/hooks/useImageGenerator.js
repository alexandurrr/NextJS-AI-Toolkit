import { useState } from "react";
import { useImageGen } from "../context/ImageGenContext";

export function useImageGenerator() {
  const [prompt, setPrompt] = useState("");
  const { generatedImages, setGeneratedImages, isLoading, setIsLoading } =
    useImageGen();

  const generateImage = async () => {
    if (!prompt) return;

    setIsLoading(true);

    try {
      const response = await fetch("/api/imagegen", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = await response.json();

      if (data.error) {
        throw new Error(data.error);
      }

      setGeneratedImages([
        { prompt, imageUrl: data.imageUrl },
        ...generatedImages,
      ]);
      setPrompt("");
    } catch (error) {
      console.error("Error generating image:", error);
      // Here you might want to set an error state or show a notification to the user
    } finally {
      setIsLoading(false);
    }
  };

  return { prompt, setPrompt, generateImage, isLoading, generatedImages };
}
