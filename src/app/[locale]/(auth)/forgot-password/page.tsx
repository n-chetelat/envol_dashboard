import styles from "@/app/[locale]/(auth)/auth.module.css";
import ForgotPasswordForm from "@/components/auth/forgotPassword/ForgotPassword";
import { Paper } from "@mui/material";
import { unstable_setRequestLocale } from "next-intl/server";
import { NextIntlClientProvider, useMessages } from "next-intl";

export default function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = useMessages();
  return (
    <div className={styles.container}>
      <Paper elevation={1} className={styles.formContainer}>
        <NextIntlClientProvider messages={messages}>
          <ForgotPasswordForm />
        </NextIntlClientProvider>
      </Paper>
    </div>
  );
}
