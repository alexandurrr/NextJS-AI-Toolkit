import styles from "./FactBox.module.css";

export default function FactBox({ word, content, style }) {
  return (
    <div className={styles.factBox} style={style}>
      <h3>{word}</h3>
      <p>{content}</p>
    </div>
  );
}
