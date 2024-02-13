import styles from "@/app/(auth)/auth.module.css";
import ForgotPasswordForm from "@/components/auth/forgotPassword/ForgotPasswordForm";
import { Paper } from "@mui/material";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <Paper elevation={1} className={styles.formContainer}>
        <ForgotPasswordForm />
      </Paper>
    </div>
  );
}
