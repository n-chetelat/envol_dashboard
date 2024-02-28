"use client";

import { useTranslations } from "next-intl";
import { useState } from "react";
import { Link } from "@/libs/navigation";

export default function ForgotPassword() {
  const [emailSent, setEmailSent] = useState<boolean>(false);
  const [inputEmail, setInputEmail] = useState<string>("");
  const t = useTranslations("auth");
  const tc = useTranslations("common");

  const handleForgotPassword = async (formData: FormData) => {
    try {
      const email = `${formData.get("email")}`;
      setInputEmail(email);
      // send reset email here
      setEmailSent(true);
    } catch (error) {
      setEmailSent(true);
      console.error(error);
    }
  };
  return (
    <section>
      {emailSent ? (
        <p>
          {t.rich("resetEmailSent", {
            bold: (chunks) => <b>{chunks}</b>,
            email: inputEmail,
          })}
        </p>
      ) : (
        <div>
          <h2>{t("resetPassword")}</h2>
          <form action={handleForgotPassword}>
            <input type="email" name="email" />
            <button type="submit">{t("resetPasswordEmail")}</button>
          </form>
        </div>
      )}
      <p>
        <Link href="/login">{t("backToLogin")}</Link>
      </p>
    </section>
  );
}
