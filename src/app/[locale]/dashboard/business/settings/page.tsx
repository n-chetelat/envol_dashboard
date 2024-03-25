import { unstable_setRequestLocale } from "next-intl/server";
import { currentUser } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { Prisma, Profile } from "@prisma/client";
import BusinessSettingsForm from "@/components/forms/BusinessSettingsForm";
import StripeConnectForm from "@/components/forms/StripeConnectForm";

export default async function BusinessSettingsPage({
  locale,
}: {
  locale: string;
}) {
  unstable_setRequestLocale(locale);
  const messages = await getMessages();
  const user = await currentUser();

  if (!user?.id) {
    redirect("/");
  }

  type BusinessWithStripeAccount = Prisma.BusinessGetPayload<{
    include: {
      stripeAccount: true;
    };
  }>;

  const profile: Profile | null = await prisma.profile.findFirst({
    where: { userId: user.id },
  });

  const business: BusinessWithStripeAccount | null =
    await prisma.business.findFirst({
      where: { profileId: profile?.id },
      include: {
        stripeAccount: true,
      },
    });

  return (
    <div className="flex flex-col">
      {!profile && <p>Loading...</p>}

      {profile && (
        <div className="m-4 flex justify-center">
          <NextIntlClientProvider messages={messages}>
            <BusinessSettingsForm profileId={profile.id} business={business} />
          </NextIntlClientProvider>
        </div>
      )}

      {business && business.name && (
        <div className="m-4 flex justify-center">
          <NextIntlClientProvider messages={messages}>
            <StripeConnectForm business={business} />
          </NextIntlClientProvider>
        </div>
      )}
    </div>
  );
}
