import ProfileCreationStepper from "@/components/stepper/ProfileCreationStepper";
import { unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { getProfile } from "@/actions/profile";

export default async function ProfileSetup({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  // If the user has a profile, send them back to the dashboard
  const profile = await getProfile();
  if (profile) {
    redirect("/dashboard");
  }

  return <ProfileCreationStepper />;
}
