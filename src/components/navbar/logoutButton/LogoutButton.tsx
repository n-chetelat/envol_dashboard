import { logout } from "@/actions/auth";
import { useTranslations } from "next-intl";
import { redirect } from "@/libs/navigation";

export default function LogoutButton() {
  const t = useTranslations("auth");
  const handleLogout = async () => {
    "use server";
    try {
      await logout();
      redirect("/login");
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
