import { serve } from "inngest/next";
import { inngest } from "@/libs/inngest";
import { handleStripeEvent } from "@/jobs/stripe";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [handleStripeEvent],
});
