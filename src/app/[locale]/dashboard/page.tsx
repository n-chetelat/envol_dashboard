import { unstable_setRequestLocale } from "next-intl/server";
import { auth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";
import ProfileForm from "@/components/profileForm/ProfileForm";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import GenericDashboard from "@/components/dashboards/GenericDashboard";
import Sidebar from "@/components/sidebar/Sidebar";

export default async function DashboardPage({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const { userId } = auth();

  if (!userId) {
    redirect("/");
  }

  const profile = await prisma.profile.findFirst({ where: { userId } });

  return (
    <>
      {profile ? (
        <div className="h-screen">
          <NextIntlClientProvider messages={messages}>
            <GenericDashboard profile={profile} />
          </NextIntlClientProvider>
        </div>
      ) : (
        <div className="flex justify-center">
          <NextIntlClientProvider messages={messages}>
            <ProfileForm userId={userId} />
          </NextIntlClientProvider>
        </div>
      )}
    </>
  );
}
