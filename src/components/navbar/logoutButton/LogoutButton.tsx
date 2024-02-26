"use client";

import { useAuth } from "@/context/AuthContext";
import { useTranslations } from "next-intl";
import { useRouter } from "@/libs/navigation";

export default function LogoutButton() {
  const t = useTranslations("auth");
  const { logout } = useAuth();
  const router = useRouter();
  const handleLogout = async () => {
    try {
      await logout();
      router.push("/login");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <form action={handleLogout}>
      <button type="submit">{t("logout")}</button>
    </form>
  );
}
