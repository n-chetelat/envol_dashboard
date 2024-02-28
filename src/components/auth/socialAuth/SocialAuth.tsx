import { useTranslations } from "next-intl";
import { handleGoogleLogin } from "@/actions/auth";

export default function SocialAuth() {
  const t = useTranslations("auth");

  return (
    <section>
      <h2>{t("socialLogin")}</h2>
      <div>
        <form action={handleGoogleLogin}>
          <button type="submit">{`${t("socialLoginWith")} Google`}</button>
        </form>
      </div>
    </section>
  );
}
