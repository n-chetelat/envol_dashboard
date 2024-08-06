import { unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";
import { currentUser } from "@clerk/nextjs";
import ProfileCreationStepper from "@/components/stepper/ProfileCreationStepper";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import GenericDashboard from "@/components/dashboards/GenericDashboard";
import { User } from "@clerk/nextjs/server";

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const user: User = await currentUser();

  if (!user) {
    redirect("/");
  }

  const profile = await prisma.profile.findFirst({
    where: { userId: user.id },
    include: {
      students: true,
      instructors: true,
      businesses: true,
    },
  });

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
