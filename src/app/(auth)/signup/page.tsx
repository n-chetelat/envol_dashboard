import styles from "@/app/(auth)/auth.module.css";
import SignupForm from "@/components/auth/signup/SignupForm";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <div className={styles.authContainer}>
        <SignupForm />
      </div>
    </div>
  );
}
