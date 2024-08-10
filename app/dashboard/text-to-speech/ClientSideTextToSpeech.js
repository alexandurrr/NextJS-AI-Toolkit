"use client";

import { useState, useEffect } from "react";
import TextToSpeechGenerator from "./TextToSpeechGenerator";

function ClientSideTextToSpeech() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return null;
  }

  return <TextToSpeechGenerator />;
}

export default ClientSideTextToSpeech;
