"use client";

import { forgotPassword } from "@/actions/auth";
import { useTranslations } from "next-intl";
import styles from "@/components/auth/auth.module.css";
import { Button, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { Link } from "@/libs/navigation";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [inputEmail, setInputEmail] = useState<string>("");
  const t = useTranslations("auth");
  const tc = useTranslations("common");

  const handleForgotPassword = async (formData: FormData) => {
    try {
      const email = `${formData.get("email")}`;
      setInputEmail(email);
      await forgotPassword(email);
      setEmailSent(true);
    } catch (error) {
      setEmailSent(true);
      console.error(error);
    }
  };
  return (
    <section>
      {emailSent ? (
        <Typography variant="body1" align="center">
          {t.rich("resetEmailSent", {
            bold: (chunks) => <b>{chunks}</b>,
            email: inputEmail,
          })}
        </Typography>
      ) : (
        <div className={styles.localAuthContainer}>
          <Typography
            component="h2"
            variant="h6"
            align="center"
            sx={{ paddingTop: "0.5rem" }}
          >
            {t("resetPassword")}
          </Typography>
          <form className={styles.form} action={handleForgotPassword}>
            <TextField
              type="email"
              label={tc("email")}
              name="email"
              error={false}
              helperText=""
              className={styles.input}
            />
            <Button type="submit" variant="contained" className={styles.input}>
              {t("resetPasswordEmail")}
            </Button>
          </form>
        </div>
      )}
      <Typography variant="body2" className={styles.authLinks}>
        <Link href="/login">{t("backToLogin")}</Link>
      </Typography>
    </section>
  );
}
