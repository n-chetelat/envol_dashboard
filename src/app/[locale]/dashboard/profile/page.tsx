import { unstable_setRequestLocale } from "next-intl/server";
import ProfileForm from "@/components/forms/ProfileForm";

export default async function ProfilePage({ locale }: { locale: string }) {
  unstable_setRequestLocale(locale);

  return <ProfileForm />;
}
