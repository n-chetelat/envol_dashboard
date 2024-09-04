import ProfileCreationStepper from "@/components/stepper/ProfileCreationStepper";
import { currentUser } from "@clerk/nextjs/server";
import { User } from "@clerk/nextjs/server";
import { unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function ProfileSetup({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const user: User | null = await currentUser();

  if (!user) {
    redirect("/");
  }

  return (
    <ProfileCreationStepper
      userId={user?.id}
      userEmail={user?.emailAddresses[0]?.emailAddress}
    />
  );
}
