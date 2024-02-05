import styles from "./login.module.css";
import LoginForm from "@/components/auth/login/LoginForm";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <LoginForm />
      </div>
    </div>
  );
}
