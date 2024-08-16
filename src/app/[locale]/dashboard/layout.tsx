import { auth } from "@clerk/nextjs";
import prisma from "@/libs/prisma";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import DashboardWrapper from "@/components/dashboards/DashboardWrapper";
import { ProfileWithProfileTypes } from "@/types";

export async function generateMetadata({
  params: { locale },
}: {
  params: { locale: string };
}) {
  const t = await getTranslations({ locale, namespace: "metadata" });

  return {
    title: t("dashboardLayout.title"),
    description: t("dashboardLayout.description"),
  };
}

export default async function DashboardLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: {
    locale: string;
  };
}>) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const { userId } = auth();
  let profile = null;
  if (userId) {
    profile = await prisma.profile.findFirst({
      where: { userId },
      include: {
        students: true,
        instructors: true,
        businesses: true,
      },
    });
  }

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <DashboardWrapper profile={profile as ProfileWithProfileTypes | null}>
          {children}
        </DashboardWrapper>
      </NextIntlClientProvider>
    </>
  );
}
