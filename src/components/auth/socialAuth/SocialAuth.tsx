"use client";

import { googleLogin } from "@/actions/auth";
import styles from "@/components/auth/auth.module.css";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";

export default function SocialAuth() {
  const t = useTranslations("auth");

  const handleGoogleLogin = async () => {
    try {
      await googleLogin();
    } catch (error) {
      console.log(error);
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
        {t("socialLogin")}
      </Typography>
      <div className={styles.socialAuthButtonContainer}>
        <Button
          className={styles.socialAuthButton}
          variant="contained"
          startIcon={<GoogleIcon fontSize="small" />}
          onClick={handleGoogleLogin}
        >
          {`${t("socialLoginWith")} Google`}
        </Button>
        <Button
          className={styles.socialAuthButton}
          variant="contained"
          startIcon={<FacebookIcon fontSize="small" />}
          onClick={() => {}}
        >
          {`${t("socialLoginWith")} Facebook`}
        </Button>
      </div>
    </section>
  );
}
