import styles from "@/app/(auth)/auth.module.css";
import LoginForm from "@/components/auth/login/LoginForm";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.authContainer}>
        <LoginForm />
      </div>
    </div>
  );
}
