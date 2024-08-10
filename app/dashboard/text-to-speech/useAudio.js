import { useState, useRef } from "react";

export default function useAudio() {
  const [playingMessageIndex, setPlayingMessageIndex] = useState(null);
  const audioRef = useRef(null);

  const playAudio = (audioUrl, index) => {
    if (audioRef.current) {
      audioRef.current.pause();
    }
    audioRef.current = new Audio(audioUrl);
    audioRef.current.play();
    setPlayingMessageIndex(index);

    audioRef.current.onended = () => {
      setPlayingMessageIndex(null);
    };
  };

  const togglePlayPause = (audioUrl, index) => {
    if (playingMessageIndex === index) {
      audioRef.current.pause();
      setPlayingMessageIndex(null);
    } else {
      playAudio(audioUrl, index);
    }
  };

  return { playAudio, playingMessageIndex, togglePlayPause };
}
