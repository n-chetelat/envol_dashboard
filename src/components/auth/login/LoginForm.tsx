"use client";

import styles from "@/components/auth/auth.module.css";
import { Button, Typography, TextField } from "@mui/material";
import { login } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import PasswordField from "../passwordField/PasswordField";

export default function LoginForm() {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const router = useRouter();

  const handleLogin = async (formData: FormData) => {
    try {
      const email = `${formData.get("email")}`;
      const password = `${formData.get("password")}`;
      const authorized = await login(email, password);
      if (authorized) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={styles.container}>
      <section className={styles.localAuthContainer}>
        <Typography
          component="h2"
          variant="h6"
          align="center"
          sx={{ paddingTop: "0.5rem" }}
        >
          Log In with Email
        </Typography>
        <form className={styles.form} action={handleLogin}>
          <TextField
            label="Email"
            name="email"
            type="email"
            error={emailError}
            helperText=""
            className={styles.input}
          />
          <PasswordField
            error={passwordError}
            classes={styles.input}
            name="password"
            label="Password"
          />
          <Button type="submit" variant="contained" className={styles.input}>
            Log In
          </Button>
        </form>
        <div className={styles.authLinks}>
          <Typography variant="body2">
            Don't have an account? <a href="/signup">Sign up</a>
          </Typography>
          <Typography variant="body2">
            <a href="/forgot-password">Forgot your password?</a>
          </Typography>
        </div>
      </section>
    </div>
  );
}
