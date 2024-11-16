"use server";

import { stripe } from "@/libs/stripe";
import { redirect } from "next/navigation";
import prisma from "@/libs/prisma";

export const createStripeAccount = async (business) => {
  if (!business?.stripeAccount) {
    let stripeAccount;
    try {
      // Create account on stripe
      const account = await stripe.accounts.create({
        type: "express",
        country: "CA",
        email: business.contactEmail,
        business_type: "individual",
        business_profile: {
          name: business?.name || "",
          support_email: business?.contactEmail || "",
        },
        default_currency: "CAD",
        capabilities: {
          card_payments: {
            requested: true,
          },
          transfers: {
            requested: true,
          },
        },
      });

      // Create local account object
      stripeAccount = await prisma.stripeAccount.create({
        data: {
          business: { connect: { id: business?.id } },
          stripeAccountId: account.id,
          chargesEnabled: account.charges_enabled,
          payoutsEnabled: account.payouts_enabled,
          onboardingComplete: account.details_submitted,
        },
      });
    } catch (error) {
      console.log(error);
    }
    if (stripeAccount) {
      await createStripeAccountLink(stripeAccount);
    }
  }
};

export const createStripeAccountLink = async (stripeAccount) => {
  let accountLink;
  try {
    accountLink = await stripe.accountLinks.create({
      account: stripeAccount.stripeAccountId || "",
      refresh_url: process.env.STRIPE_REFRESH_URL,
      return_url: process.env.STRIPE_RETURN_URL,
      type: "account_onboarding",
      collect: "eventually_due",
    });
  } catch (error) {
    console.log(error);
  }
  // Workaround for NEXT_REDIRECT problem in try-catch block
  if (accountLink) {
    redirect(accountLink.url);
  }
};
