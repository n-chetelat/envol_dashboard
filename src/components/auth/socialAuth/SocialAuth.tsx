"use client";

import styles from "@/components/auth/auth.module.css";
import GoogleIcon from "@mui/icons-material/Google";
import { Button, Typography } from "@mui/material";
import { useTranslations } from "next-intl";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "@/libs/navigation";

export default function SocialAuth() {
  const router = useRouter();
  const t = useTranslations("auth");
  const { googleLogin } = useAuth();

  const handleGoogleLogin = async () => {
    try {
      const result = await googleLogin();
      if (result?.user) {
        router.push("/dashboard");
      }
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
      </div>
    </section>
  );
}
