import Stripe from "stripe";
export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
  typescript: true,
});

export const HANDLED_EVENTS = ["account.updated"];

// Account type:Express
// Charge type: Destinaion
// Who pays fees: Platform, before payout to vendor
