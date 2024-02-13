"use client";

import styles from "@/components/auth/auth.module.css";
import { forgotPassword } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button, Typography, TextField, Box } from "@mui/material";

export default function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);
  const [emailError, setEmailError] = useState<boolean>(false);

  const router = useRouter();
  const handleForgotPassword = async (formData: FormData) => {
    try {
      const email = `${formData.get("email")}`;
      setEmail(email);
      await forgotPassword(email);
      setEmailSent(true);
    } catch (error) {
      setEmailSent(false);
      console.error(error);
    }
  };
  return (
    <div className={styles.container}>
      {emailSent ? (
        <Typography variant="body1" align="center">
          Thanks! If we have an account for
          <Box component="span" sx={{ fontWeight: "600" }}>
            {` ${email} `}
          </Box>
          you will receive an email shortly to reset your password.
        </Typography>
      ) : (
        <section className={styles.localAuthContainer}>
          <Typography
            component="h2"
            variant="h6"
            align="center"
            sx={{ paddingTop: "0.5rem" }}
          >
            Reset your password
          </Typography>
          <form className={styles.form} action={handleForgotPassword}>
            <TextField
              label="Email"
              name="email"
              type="email"
              error={emailError}
              helperText=""
              className={styles.input}
            />
            <Button type="submit" variant="contained" className={styles.input}>
              Send Password Reset Email
            </Button>
          </form>
        </section>
      )}
      <Typography variant="body2" className={styles.authLinks}>
        <a href="/login">Back to Log In page</a>
      </Typography>
    </div>
  );
}
