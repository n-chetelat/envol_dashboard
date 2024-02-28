"use client";

import styles from "@/components/auth/auth.module.css";
import { Button, TextField, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/libs/navigation";
import PasswordField from "../fields/PasswordField";

export default function LoginForm() {
  const t = useTranslations("auth");
  const tc = useTranslations("common");

  const handleSignUp = async (formData: FormData) => {
    try {
      const email = `${formData.get("email")}`;
      const password = `${formData.get("password")}`;
      const passwordConfirmation = `${formData.get("passwordConfirmation")}`;
      if (password != passwordConfirmation) {
        throw new Error("NOT LOCALIZED - Passwords do not match");
      }
      // sign up here
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
        {t("emailSignup")}
      </Typography>
      <form className={styles.form} action={handleSignUp}>
        <TextField
          label={tc("email")}
          name="email"
          type="email"
          error={false}
          helperText=""
          className={styles.input}
        />
        <PasswordField
          error={false}
          classes={styles.input}
          name="password"
          label={t("password")}
        />
        <PasswordField
          error={false}
          classes={styles.input}
          name="passwordConfirmation"
          label={t("confirmPassword")}
        />
        <Button type="submit" variant="contained" className={styles.input}>
          {t("signup")}
        </Button>
      </form>
      <Typography variant="body2" className={styles.authLinks}>
        {t("alreadyAccount")} <Link href="/login">{t("login")}</Link>
      </Typography>
    </section>
  );
}
