import styles from "@/app/(auth)/auth.module.css";
import ForgotPasswordForm from "@/components/auth/forgotPassword/ForgotPasswordForm";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.authContainer}>
        <ForgotPasswordForm />
      </div>
    </div>
  );
}
