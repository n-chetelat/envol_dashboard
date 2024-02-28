"use server";
import { signIn, signOut } from "@/libs/auth";

export const handleGoogleLogin = async () => {
  "use server";
  await signIn("google", { redirectTo: "/dashboard" });
};

export const handleLogout = async () => {
  "use server";
  await signOut({ redirectTo: "/login" });
};
