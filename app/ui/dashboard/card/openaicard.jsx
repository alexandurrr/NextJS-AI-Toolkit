import { MdSupervisedUserCircle } from "react-icons/md";
import styles from "./card.module.css";

const Openaicard = () => {
  return (
    <div className={styles.container}>
      <MdSupervisedUserCircle size={24} />
      <div className={styles.texts}>
        <span className={styles.title}>OpenAI</span>
        <span className={styles.number}>123.456</span>
        <span className={styles.detail}>
          <span className={styles.positive}>12%</span> more than previous week
        </span>
      </div>
    </div>
  );
};

export default Openaicard;
