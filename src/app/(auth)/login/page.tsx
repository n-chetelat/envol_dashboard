import styles from "@/app/(auth)/auth.module.css";
import LoginForm from "@/components/auth/login/LoginForm";
import SocialAuth from "@/components/auth/socialAuth/SocialAuth";
import { Divider, Paper } from "@mui/material";

export default function LoginPage() {
  return (
    <div className={styles.container}>
      <Paper elevation={1} className={styles.formContainer}>
        <SocialAuth />
        <Divider variant="middle"> or </Divider>
        <LoginForm />
      </Paper>
    </div>
  );
}
