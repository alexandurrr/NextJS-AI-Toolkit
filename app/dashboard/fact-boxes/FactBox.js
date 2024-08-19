import styles from "./FactBox.module.css";

export default function FactBox({ word, content }) {
  return (
    <div className={styles.factBox}>
      <div className={styles.arrow}></div>
      <h3>{word}</h3>
      <p>{content}</p>
    </div>
  );
}
