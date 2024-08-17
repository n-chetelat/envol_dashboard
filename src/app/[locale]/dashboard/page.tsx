import { getUserProfileWithProfileTypes } from "@/actions/profile";
import GenericDashboard from "@/components/dashboards/GenericDashboard";
import ProfileCreationStepper from "@/components/stepper/ProfileCreationStepper";
import { ProfileWithProfileTypes } from "@/libs/types";
import { currentUser } from "@clerk/nextjs";
import { User } from "@clerk/nextjs/server";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const user: User | null = await currentUser();

  if (!user) {
    redirect("/");
  }

  const profile: ProfileWithProfileTypes | null =
    await getUserProfileWithProfileTypes();

  return (
    <>
      {profile ? (
        <div>
          <NextIntlClientProvider messages={messages}>
            <GenericDashboard profile={profile} />
          </NextIntlClientProvider>
        </div>
      ) : (
        <div>
          <NextIntlClientProvider messages={messages}>
            <ProfileCreationStepper
              userId={user?.id}
              userEmail={user?.emailAddresses[0]?.emailAddress}
            />
          </NextIntlClientProvider>
        </div>
      )}
    </>
  );
}
