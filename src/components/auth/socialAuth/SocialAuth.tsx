"use client";

import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { googleLogin } from "@/actions/auth";
import { Button, Typography } from "@mui/material";
import styles from "@/components/auth/auth.module.css";

export default function SocialAuth() {
  return (
    <section className={styles.container}>
      <Typography
        component="h2"
        variant="h6"
        align="center"
        sx={{ paddingTop: "0.5rem" }}
      >
        Sign Up with Socials
      </Typography>
      <div className={styles.socialAuthButtonContainer}>
        <Button
          className={styles.socialAuthButton}
          variant="contained"
          startIcon={
            <GoogleIcon fontSize="small" onClick={() => googleLogin()} />
          }
        >
          Log In with Google
        </Button>
        <Button
          className={styles.socialAuthButton}
          variant="contained"
          startIcon={<FacebookIcon fontSize="small" />}
        >
          Log In with Facebook
        </Button>
      </div>
    </section>
  );
}
