"use client";
import { useState, useEffect, useRef } from "react";
import styles from "./ParagraphAnalyzer.module.css";
import InputForm from "./InputForm";
import FactBox from "./FactBox";

export default function ParagraphAnalyzer() {
  const [paragraph, setParagraph] = useState("");
  const [selectedWord, setSelectedWord] = useState(null);
  const [factBoxes, setFactBoxes] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const paragraphRef = useRef(null);

  const handleParagraphSubmit = (text) => {
    setParagraph(text);
    setSelectedWord(null);
    setFactBoxes({});
  };

  const handleWordClick = (word) => {
    setSelectedWord((prevWord) => (prevWord === word ? null : word));
  };

  const generateFactBox = async (word) => {
    if (factBoxes[word]) return;

    setIsLoading(true);
    try {
      const response = await fetch("/api/generate-fact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ word, context: paragraph }),
      });
      const data = await response.json();
      setFactBoxes((prev) => ({ ...prev, [word]: data.fact }));
    } catch (error) {
      console.error("Error generating fact:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (selectedWord) {
      generateFactBox(selectedWord);
    }
  }, [selectedWord]);

  return (
    <div className={styles.pageContainer}>
      <div className={styles.analyzerContainer}>
        <div className={styles.paragraphDisplay} ref={paragraphRef}>
          {paragraph.split(" ").map((word, index) => (
            <span
              key={index}
              className={`${styles.word} 
                ${selectedWord === word ? styles.selected : ""}
                ${factBoxes[word] ? styles.hasFactBox : ""}`}
              onClick={() => handleWordClick(word)}
            >
              {word}{" "}
              {selectedWord === word && factBoxes[word] && (
                <FactBox word={word} content={factBoxes[word]} />
              )}
            </span>
          ))}
        </div>
        <InputForm
          isLoading={isLoading}
          onSubmit={handleParagraphSubmit}
          placeholder="Enter your paragraph..."
        />
      </div>
    </div>
  );
}
