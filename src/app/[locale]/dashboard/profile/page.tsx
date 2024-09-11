import { unstable_setRequestLocale } from "next-intl/server";
import ProfileForm from "@/components/forms/ProfileForm";
import DeleteProfileForm from "@/components/forms/DeleteProfileForm";
import { getTranslations } from "next-intl/server";

export default async function ProfilePage({ locale }: { locale: string }) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("profile");
  return (
    <div className="p-8">
      <div className="paper">
        <h2 className="title mb-4">{t("profileInformation")}</h2>
        <ProfileForm />
      </div>
      <div className="paper mt-8">
        <h2 className="title mb-4">{t("deleteProfile")}</h2>
        <DeleteProfileForm />
      </div>
    </div>
  );
}
