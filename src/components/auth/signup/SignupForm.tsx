"use client";

import styles from "@/components/auth/auth.module.css";
import { Button, TextField, Typography } from "@mui/material";
import { signup } from "@/actions/auth";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import PasswordField from "../passwordField/PasswordField";

export default function LoginForm() {
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const router = useRouter();

  const handleSignUp = async (formData: FormData) => {
    try {
      const email = `${formData.get("email")}`;
      const password = `${formData.get("password")}`;
      const passwordConfirmation = `${formData.get("passwordConfirmation")}`;
      if (password != passwordConfirmation) {
        throw new Error("Passwords do not match");
      }
      const authorized = await signup(email, password);
      if (authorized) {
        router.push("/dashboard");
      }
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section className={styles.container}>
      <Typography
        component="h2"
        variant="h6"
        align="center"
        sx={{ paddingTop: "0.5rem" }}
      >
        Sign Up with Email
      </Typography>
      <form className={styles.form} action={handleSignUp}>
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
        <PasswordField
          error={passwordError}
          classes={styles.input}
          name="passwordConfirmation"
          label="Confirm Password"
        />
        <Button type="submit" variant="contained" className={styles.input}>
          Sign Up
        </Button>
      </form>
      <Typography variant="body2" className={styles.authLinks}>
        Already have an account? <Link href="/login">Log in</Link>
      </Typography>
    </section>
  );
}
