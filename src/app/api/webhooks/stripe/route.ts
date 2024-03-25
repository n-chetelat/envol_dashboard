// Stripe Event object: https://docs.stripe.com/api/events/object
import { stripe } from "@/libs/stripe";
import { inngest } from "@/libs/inngest";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  const payload = await request.text();
  const requestHeaders = new Headers(request.headers);
  const signature = requestHeaders.get("stripe-signature") || "";
  const secret = process.env.WEBHOOK_SIGNING_SECRET || "";

  let event;

  try {
    event = stripe.webhooks.constructEvent(payload, signature, secret);
  } catch (error) {
    return new Response(
      `Webhook event validation failed: ${(error as Error).message}`,
      {
        status: 400,
      },
    );
  }

  // Handle event asynchronously
  await inngest.send({
    name: "stripe/handle-event",
    data: {
      stripeEvent: event,
    },
  });

  return Response.json({ received: true });
}
