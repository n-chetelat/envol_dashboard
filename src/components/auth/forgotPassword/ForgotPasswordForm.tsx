"use client";

import styles from "@/components/auth/auth.module.css";
import { forgotPassword } from "@/actions/auth";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@mui/material";

export default function ForgotPasswordForm() {
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [email, setEmail] = useState<string | null>(null);

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
        <p>
          There is an account for '{email}' you will receive an email to reset
          your password
        </p>
      ) : (
        <section className={styles.localAuthContainer}>
          <h2 className={styles.formTitle}>Reset your Password</h2>
          <form className={styles.form} action={handleForgotPassword}>
            <label>Email</label>
            <input className={styles.input} type="text" name="email" />
            <Button type="submit" variant="contained">
              Send Password Reset Email
            </Button>
          </form>
          <p>
            <a href="/login">Back to Log In page</a>
          </p>
        </section>
      )}
    </div>
  );
}
