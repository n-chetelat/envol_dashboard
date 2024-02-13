import styles from "@/app/(auth)/auth.module.css";
import SignupForm from "@/components/auth/signup/SignupForm";
import SocialAuth from "@/components/auth/socialAuth/SocialAuth";
import { Divider, Paper } from "@mui/material";

export default function SignupPage() {
  return (
    <div className={styles.container}>
      <Paper elevation={1} className={styles.formContainer}>
        <SocialAuth />
        <Divider variant="middle"> or </Divider>
        <SignupForm />
      </Paper>
    </div>
  );
}
