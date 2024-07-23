"use client";

import { createContext, useContext, useState } from "react";
import { usePersistentState } from "../hooks/usePersistentState";

const ImageGenContext = createContext();

export function ImageGenProvider({ children }) {
  const [generatedImages, setGeneratedImages] = usePersistentState(
    "generatedImages",
    []
  );
  const [isLoading, setIsLoading] = useState(false);

  return (
    <ImageGenContext.Provider
      value={{ generatedImages, setGeneratedImages, isLoading, setIsLoading }}
    >
      {children}
    </ImageGenContext.Provider>
  );
}

export function useImageGen() {
  return useContext(ImageGenContext);
}
