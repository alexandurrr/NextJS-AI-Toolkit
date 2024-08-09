"use client";

import { TextToSpeechProvider } from "../../context/TextToSpeechContext";

export default function TextToSpeechLayout({ children }) {
  return <TextToSpeechProvider>{children}</TextToSpeechProvider>;
}
