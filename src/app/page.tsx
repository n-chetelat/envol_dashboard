import { Agbalumo } from "next/font/google";
import styles from "./home.module.css";
import { Button } from "@mui/material";

const abgalumo = Agbalumo({ subsets: ["latin-ext"], weight: "400" });
export default function Home() {
  return (
    <main className={styles.container}>
      <h1 className={`${abgalumo.className} ${styles.title}`}>Kollage</h1>
      <h2 className={styles.subtitle}>Join the circus</h2>
      <div className={styles.buttonsContainer}>
        <Button component={"a"} href="/signup" variant="contained">
          Sign Up
        </Button>
        <Button component={"a"} href="/login" variant="outlined">
          Log In
        </Button>
      </div>
    </main>
  );
}
