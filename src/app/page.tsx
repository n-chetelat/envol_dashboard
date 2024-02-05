import { Agbalumo } from "next/font/google";
import styles from "./home.module.css";
import Button from "@/components/button/Button";

const abgalumo = Agbalumo({ subsets: ["latin-ext"], weight: "400" });
export default function Home() {
  return (
    <main className={styles.container}>
      <h1 className={`${abgalumo.className} ${styles.title}`}>Kollage</h1>
      <h2 className={styles.subtitle}>Join the circus</h2>
      <div className={styles.buttonsContainer}>
        <Button classes={styles.button} type="filled" text="Sign Up" />
        <Button classes={styles.button} type="outlined" text="Log In" />
      </div>
    </main>
  );
}
