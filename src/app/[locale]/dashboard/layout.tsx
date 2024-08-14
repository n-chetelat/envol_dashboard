import { auth } from "@clerk/nextjs";
import prisma from "@/libs/prisma";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { getTranslations, unstable_setRequestLocale } from "next-intl/server";
import DashboardWrapper from "@/components/dashboards/DashboardWrapper";

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
  const { userId } = auth();
  const messages = await getMessages();
  const profile = await prisma.profile.findFirst({
    where: { userId },
    include: {
      students: true,
      instructors: true,
      businesses: true,
    },
  });

  return (
    <>
      {profile ? (
        <NextIntlClientProvider messages={messages}>
          <DashboardWrapper profile={profile}>{children}</DashboardWrapper>
        </NextIntlClientProvider>
      ) : null}
    </>
  );
}
