import { Agbalumo } from "next/font/google";
import styles from "./home.module.css";
import { Button, Typography } from "@mui/material";

const agbalumo = Agbalumo({ subsets: ["latin-ext"], weight: "400" });
export default function Home() {
  return (
    <main className={styles.container}>
      <Typography
        component="h1"
        sx={{ fontFamily: agbalumo.style.fontFamily }}
        className={styles.title}
      >
        Kollage
      </Typography>
      <Typography variant="h6" component="h2">
        Join the circus
      </Typography>
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
