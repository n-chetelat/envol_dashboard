import styles from "./Button.module.css";

type ButtonComponentType = {
  type: string;
  text: string;
  classes: string;
};

export default function Button({ type, text, classes }: ButtonComponentType) {
  return (
    <button className={`${styles.container} ${styles[type]} ${classes}`}>
      {text}
    </button>
  );
}
