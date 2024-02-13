"use client";

import styles from "@/components/auth/auth.module.css";
import { Button } from "@mui/material";
import { login, googleLogin } from "@/actions/auth";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";

export default function LoginForm() {
  const router = useRouter();
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
      <section className={styles.socialAuthContainer}>
        <h2 className={styles.formTitle}>Log In with Socials</h2>
        <div className={styles.socialAuthButtonContainer}>
          <Button
            className={styles.socialAuthButton}
            variant="contained"
            endIcon={
              <GoogleIcon fontSize="small" onClick={() => googleLogin()} />
            }
          >
            Log In with Google
          </Button>
          <Button
            className={styles.socialAuthButton}
            variant="contained"
            endIcon={<FacebookIcon fontSize="small" />}
          >
            Log In with Facebook
          </Button>
        </div>
      </section>
      <hr className={styles.hr} />
      <section className={styles.localAuthContainer}>
        <h2 className={styles.formTitle}>Log In with Email</h2>
        <form className={styles.form} action={handleLogin}>
          <label>Email</label>
          <input className={styles.input} type="text" name="email" />
          <label>Password</label>
          <input className={styles.input} type="password" name="password" />
          <Button type="submit" variant="contained">
            Log In
          </Button>
        </form>
        <p>
          Don't have an account? <a href="/signup">Sign up</a>
        </p>
        <p>
          <a href="/forgot-password">Forgot your password?</a>
        </p>
      </section>
    </div>
  );
}
