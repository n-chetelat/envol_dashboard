"use client";

import { useTranslations } from "next-intl";
import { createStripeAccountLink, createStripeAccount } from "@/actions/stripe";

export default function StripeConnectForm({ business }) {
  const t = useTranslations("settings");

  const handleCreateStripeAccount = async () => {
    try {
      await createStripeAccount(business);
    } catch (error) {
      console.log(error);
    }
  };

  const handleCreateStripeAccountLink = async () => {
    try {
      await createStripeAccountLink(business.stripeAccount);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {!business?.stripeAccount && (
        <form
          action={handleCreateStripeAccount}
          className="flex justify-center"
        >
          <button type="submit" className="btn-primary ">
            {t("createStripe")}
          </button>
        </form>
      )}

      {business?.stripeAccount &&
        !business.stripeAccount?.onboardingComplete && (
          <form
            className="flex justify-center"
            action={handleCreateStripeAccountLink}
          >
            <button type="submit" className="btn-primary">
              {t("linkStripe")}
            </button>
          </form>
        )}
    </>
  );
}
