import styles from "@/components/auth/auth.module.css";
import GoogleIcon from "@mui/icons-material/Google";
import { Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { handleGoogleLogin } from "@/actions/auth";

export default function SocialAuth() {
  const t = useTranslations("auth");

  return (
    <section className={styles.container}>
      <Typography
        component="h2"
        variant="h6"
        align="center"
        sx={{ paddingTop: "0.5rem" }}
      >
        {t("socialLogin")}
      </Typography>
      <div className="flex flex-col w-ful">
        <form action={handleGoogleLogin} className="flex">
          <button type="submit" className="mt-4 flex-1 text-left w-full">
            {`${t("socialLoginWith")} Google`}
          </button>
        </form>
      </div>
    </section>
  );
}
