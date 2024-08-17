import { getUserProfileWithProfileTypes } from "@/actions/profile";
import DashboardWrapper from "@/components/dashboards/DashboardWrapper";
import { ProfileWithProfileTypes } from "@/libs/types";
import { NextIntlClientProvider } from "next-intl";
import {
  getMessages,
  getTranslations,
  unstable_setRequestLocale,
} from "next-intl/server";

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
  const profile: ProfileWithProfileTypes | null =
    await getUserProfileWithProfileTypes();

  return (
    <>
      <NextIntlClientProvider messages={messages}>
        <DashboardWrapper profile={profile}>{children}</DashboardWrapper>
      </NextIntlClientProvider>
    </>
  );
}
