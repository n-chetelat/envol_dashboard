import ProfileCreationStepper from "@/components/stepper/ProfileCreationStepper";
import { unstable_setRequestLocale } from "next-intl/server";

export default async function ProfileSetup({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);

  return <ProfileCreationStepper />;
}
