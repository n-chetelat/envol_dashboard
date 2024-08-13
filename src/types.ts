import { Prisma } from "@prisma/client";

export type BusinessWithStripeAccount = Prisma.BusinessGetPayload<{
  include: {
    stripeAccount: true;
  };
}>;
