"use client";

import styles from "@/components/auth/auth.module.css";
import { Button } from "@mui/material";
import { LogInUser } from "@/actions/auth";

export default function LoginForm() {
  return (
    <div className={styles.container}>
      <section className={styles.socialAuthContainer}>
        <h2 className={styles.formTitle}>Log In with Socials</h2>
        <div className={styles.socialAuthButtonContainer}>
          <Button className={`${styles.socialAuthButton} ${styles.button}`}>
            Log In with Google
          </Button>
          <Button className={`${styles.socialAuthButton} ${styles.button}`}>
            Log In with Facebook
          </Button>
        </div>
      </section>
      <hr className={styles.hr} />
      <section className={styles.localAuthContainer}>
        <h2 className={styles.formTitle}>Log In with Email</h2>
        <form className={styles.form} action={LogInUser}>
          <label>Email</label>
          <input className={styles.input} type="text" name="email" />
          <label>Password</label>
          <input className={styles.input} type="password" name="password" />
          <input
            type="submit"
            value="Log In"
            className={`${styles.submitButton} ${styles.button}`}
          />
        </form>
      </section>
    </div>
  );
}
