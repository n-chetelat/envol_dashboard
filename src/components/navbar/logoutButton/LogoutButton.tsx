import { logout } from "@/actions/auth";
import { redirect } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";

export default function LogoutButton() {
  const t = useTranslations("auth");
  const locale = useLocale();
  const handleLogout = async () => {
    "use server";
    try {
      await logout();
      redirect(`/${locale}`);
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
