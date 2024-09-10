import { unstable_setRequestLocale } from "next-intl/server";
import ProfileForm from "@/components/forms/ProfileForm";

export default async function ProfilePage({ locale }: { locale: string }) {
  unstable_setRequestLocale(locale);

  return (
    <div>
      <h2>Profile Information</h2>
      <ProfileForm />

      <h2>Delete Profile</h2>
      <p>
        This action deletes profile and user account, and all other information
      </p>
    </div>
  );
}
