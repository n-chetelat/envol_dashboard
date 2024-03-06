import { unstable_setRequestLocale } from "next-intl/server";
import { auth, clerkClient } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";
import ProfileForm from "@/components/profileForm/ProfileForm";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";

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
    f;
  }

  const profile = await prisma.profile.findFirst({ where: { userId } });

  return (
    <div>
      {!profile ? (
        <div>Render dashboard</div>
      ) : (
        <div>
          <NextIntlClientProvider messages={messages}>
            <ProfileForm userId={userId} />
          </NextIntlClientProvider>
        </div>
      )}
    </div>
  );
}
