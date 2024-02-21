import styles from "./home.module.css";
import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("home");
  const ta = useTranslations("auth");
  return (
    <main className={styles.container}>
      <Typography component="h1" className={styles.title}>
        Kollage
      </Typography>
      <Typography variant="h6" component="h2">
        {t("subtitle")}
      </Typography>
      <div className={styles.buttonsContainer}>
        <Button component={"a"} href={`/${locale}/signup`} variant="contained">
          {ta("signup")}
        </Button>
        <Button component={"a"} href={`/${locale}/login`} variant="outlined">
          {ta("login")}
        </Button>
      </div>
    </main>
  );
}
