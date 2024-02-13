"use client";

import styles from "@/components/auth/auth.module.css";
import { Button, TextField, InputAdornment, IconButton } from "@mui/material";
import { signup } from "@/actions/auth";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import FacebookIcon from "@mui/icons-material/Facebook";
import GoogleIcon from "@mui/icons-material/Google";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useState } from "react";

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);
  const [emailError, setEmailError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const router = useRouter();

  const handleSignUp = async (formData: FormData) => {
    try {
      const email = `${formData.get("email")}`;
      const password = `${formData.get("password")}`;
      const passwordConfirmation = `${formData.get("passwordConfirmation")}`;
      if (password != passwordConfirmation) {
        throw new Error("Passwords do not match");
      }
      const authorized = await signup(email, password);
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
        <h2 className={styles.formTitle}>Sign Up with Socials</h2>
        <div className={styles.socialAuthButtonContainer}>
          <Button
            className={styles.socialAuthButton}
            variant="contained"
            startIcon={<GoogleIcon fontSize="small" />}
          >
            Sign Up with Google
          </Button>
          <Button
            className={styles.socialAuthButton}
            variant="contained"
            startIcon={<FacebookIcon fontSize="small" />}
          >
            Sign Up with Facebook
          </Button>
        </div>
      </section>

      <hr className={styles.hr} />

      <section className={styles.localAuthContainer}>
        <h2 className={styles.formTitle}>Sign Up with Email</h2>
        <form className={styles.form} action={handleSignUp}>
          <TextField
            label="Email"
            name="email"
            type="email"
            error={emailError}
            helperText=""
          />
          <TextField
            label="Password"
            type={showPassword ? "text" : "password"}
            name="password"
            error={passwordError}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setShowPassword((prevState) => !prevState);
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            label="Confirm Password"
            type={showConfirmPassword ? "text" : "password"}
            name="passwordConfirmation"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => {
                      setShowConfirmPassword((prevState) => !prevState);
                    }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button type="submit" variant="contained">
            Sign Up
          </Button>
        </form>
        <p>
          Already have an account? <Link href="/login">Log in</Link>
        </p>
      </section>
    </div>
  );
}
