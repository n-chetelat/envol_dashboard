import styles from "@/app/[locale]/(auth)/auth.module.css";
import LoginForm from "@/components/auth/login/Login";
import SocialAuth from "@/components/auth/socialAuth/SocialAuth";
import { Divider, Paper } from "@mui/material";
import { unstable_setRequestLocale } from "next-intl/server";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";

export default function LoginPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("common");
  const messages = useMessages();
  return (
    <div className={styles.container}>
      <Paper elevation={1} className={styles.formContainer}>
        <NextIntlClientProvider messages={messages}>
          <SocialAuth />
          <Divider variant="middle"> {t("or")} </Divider>
          <LoginForm />
        </NextIntlClientProvider>
      </Paper>
    </div>
  );
}
