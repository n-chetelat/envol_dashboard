import { useTranslations } from "next-intl";
import { handleLogout } from "@/actions/auth";

export default function LogoutButton() {
  const t = useTranslations("auth");
  return (
    <div className="flex">
      <form action={handleLogout}>
        <button type="submit">{t("logout")}</button>
      </form>
    </div>
  );
}
