import { serve } from "inngest/next";
import { handleFileDelete } from "@/jobs/files";
import { handleStripeEvent } from "@/jobs/stripe";
import { inngest } from "@/libs/inngest";

export const { GET, POST, PUT } = serve({
  client: inngest,
  functions: [handleStripeEvent, handleFileDelete],
});
