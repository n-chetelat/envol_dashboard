"use client";

import styles from "@/components/auth/auth.module.css";
import { Button, Typography, TextField } from "@mui/material";
import { login } from "@/actions/auth";
import PasswordField from "../fields/PasswordField";
import { useTranslations } from "next-intl";
import { Link, useRouter } from "@/libs/navigation";

export default function LoginForm() {
  const router = useRouter();
  const t = useTranslations("auth");
  const tc = useTranslations("common");

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
          {t("emailLogin")}
        </Typography>
        <form className={styles.form} action={handleLogin}>
          <TextField
            label={tc("email")}
            name="email"
            type="email"
            helperText=""
            error={false}
            className={styles.input}
          />
          <PasswordField
            classes={styles.input}
            name="password"
            label={t("password")}
            error={false}
          />
          <Button type="submit" variant="contained" className={styles.input}>
            {t("login")}
          </Button>
        </form>
        <div className={styles.authLinks}>
          <Typography variant="body2">
            {`${t("noAccount")} `}
            <Link href="/signup">{t("signup")}</Link>
          </Typography>
          <Typography variant="body2">
            <Link href="/forgot-password">{t("forgotPassword")}</Link>
          </Typography>
        </div>
      </section>
    </div>
  );
}
