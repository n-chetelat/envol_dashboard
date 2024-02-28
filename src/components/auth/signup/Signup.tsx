"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/libs/navigation";

export default function LoginForm() {
  const t = useTranslations("auth");
  const tc = useTranslations("common");

  const handleSignUp = async (formData: FormData) => {
    try {
      const email = `${formData.get("email")}`;
      const password = `${formData.get("password")}`;
      const passwordConfirmation = `${formData.get("passwordConfirmation")}`;
      if (password != passwordConfirmation) {
        throw new Error("NOT LOCALIZED - Passwords do not match");
      }
      // sign up here
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <section>
      <h2>{t("emailSignup")}</h2>
      <form action={handleSignUp}>
        <input name="email" type="email" />
        <input name="password" />
        <input name="passwordConfirmation" />
        <button type="submit">{t("signup")}</button>
      </form>
      <p>
        {t("alreadyAccount")} <Link href="/login">{t("login")}</Link>
      </p>
    </section>
  );
}
