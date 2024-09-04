import { unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { getUserProfile } from "@/queries/profile";
import { getBusinessWithStripeAccount } from "@/queries/business";
import { BusinessWithStripeAccount } from "@/libs/types";
import BusinessSettingsForm from "@/components/forms/BusinessSettingsForm";
import StripeConnectForm from "@/components/forms/StripeConnectForm";
import { auth } from "@clerk/nextjs/server";

export default async function BusinessSettingsPage({
  locale,
}: {
  locale: string;
}) {
  unstable_setRequestLocale(locale);

  let profile;
  const { userId } = auth();
  if (userId) profile = await getUserProfile(userId);
  if (!userId || !profile) {
    redirect("/");
  }

  const business: BusinessWithStripeAccount | null =
    await getBusinessWithStripeAccount(profile.id);

  return (
    <div className="flex flex-col">
      {profile && business && (
        <div className="m-4 flex justify-center">
          <BusinessSettingsForm profileId={profile.id} business={business} />
        </div>
      )}

      {business && business.name && (
        <div className="m-4 flex justify-center">
          <StripeConnectForm business={business} />
        </div>
      )}
    </div>
  );
}
