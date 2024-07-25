import Image from "next/image";
import styles from "./rightbar.module.css";
import { MdInfoOutline, MdReadMore } from "react-icons/md";

const Rightbar = () => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image
            className={styles.bg}
            src="/chatgpt-icon.png"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="OpenAI"
          />
        </div>
        <div className={styles.text}>
          <span className={styles.notification}>🔥 GPT4-O Usage</span>
          <h3 className={styles.title}>OpenAI</h3>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <a href="https://openai.com/" target="_blank">
            <button className={styles.button}>
              <MdInfoOutline />
              Learn more
            </button>
          </a>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image
            className={styles.bg}
            src="/claude-ai-icon.png"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Anthropic - Claude AI"
          />
        </div>
        <div className={styles.text}>
          <span className={styles.notification}>🔥 TBD</span>
          <h3 className={styles.title}>Claude 3.5</h3>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <a href="https://www.anthropic.com/" target="_blank">
            <button className={styles.button}>
              <MdInfoOutline />
              Learn more
            </button>
          </a>
        </div>
      </div>
      <div className={styles.item}>
        <div className={styles.bgContainer}>
          <Image
            className={styles.bg}
            src="/google-gemini-icon.png"
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            alt="Google Gemini"
          />
        </div>
        <div className={styles.text}>
          <span className={styles.notification}>🔥 TBD</span>
          <h3 className={styles.title}>Gemini</h3>
          <p className={styles.desc}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit.
          </p>
          <a
            href="https://deepmind.google/technologies/gemini/"
            target="_blank"
          >
            <button className={styles.button}>
              <MdInfoOutline />
              Learn more
            </button>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Rightbar;
