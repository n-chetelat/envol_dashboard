import styles from "@/app/[locale]/(auth)/auth.module.css";
import SignupForm from "@/components/auth/signup/Signup";
import SocialAuth from "@/components/auth/socialAuth/SocialAuth";
import { Divider, Paper } from "@mui/material";
import { unstable_setRequestLocale } from "next-intl/server";
import {
  NextIntlClientProvider,
  useMessages,
  useTranslations,
} from "next-intl";

export default function SignupPage({
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
        <SocialAuth />
        <NextIntlClientProvider messages={messages}>
          <Divider variant="middle"> {t("or")} </Divider>
          <SignupForm />
        </NextIntlClientProvider>
      </Paper>
    </div>
  );
}
