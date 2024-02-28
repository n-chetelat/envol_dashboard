"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/libs/navigation";

export default function LoginForm() {
  const t = useTranslations("auth");
  const tc = useTranslations("common");

  const handleLogin = async (formData: FormData) => {
    try {
      const email = `${formData.get("email")}`;
      const password = `${formData.get("password")}`;
      // log in here
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <section>
        <h2>{t("emailLogin")}</h2>
        <form action={handleLogin}>
          <input name="email" type="email" />
          <input name="password" />
          <button type="submit">{t("login")}</button>
        </form>
        <div>
          <p>
            {`${t("noAccount")} `}
            <Link href="/signup">{t("signup")}</Link>
          </p>
          <p>
            <Link href="/forgot-password">{t("forgotPassword")}</Link>
          </p>
        </div>
      </section>
    </div>
  );
}
