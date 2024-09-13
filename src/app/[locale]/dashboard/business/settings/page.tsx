import { unstable_setRequestLocale } from "next-intl/server";
import { redirect } from "next/navigation";
import { getProfile } from "@/queries/profile";
import { getBusiness } from "@/queries/business";
import { BusinessWithStripeAccount } from "@/libs/types";
import BusinessSettingsForm from "@/components/forms/BusinessSettingsForm";
import StripeConnectForm from "@/components/forms/StripeConnectForm";
import { getTranslations } from "next-intl/server";

export default async function BusinessSettingsPage({
  locale,
}: {
  locale: string;
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations("settings");

  const profile = await getProfile();
  if (!profile) {
    redirect("/profile_setup");
  }

  const business: BusinessWithStripeAccount | null = await getBusiness(
    profile.id,
  );

  return (
    <div className="p-8">
      {profile && business && (
        <div className="paper">
          <h2 className="title mb-4">{t("businessTitle")}</h2>
          <BusinessSettingsForm profileId={profile.id} business={business} />
        </div>
      )}

      {business && business.name && (
        <div className="paper mt-8">
          <h2 className="title mb-4">{t("payments")}</h2>
          {business?.stripeAccount?.onboardingComplete && (
            <div>payment history component, and link to stripe dashboard</div>
          )}
          <StripeConnectForm business={business} />
        </div>
      )}
    </div>
  );
}
