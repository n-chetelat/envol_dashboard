import { Prisma } from "@prisma/client";

export { type ProfileType } from "@prisma/client";

export type ProfileWithProfileTypes = Prisma.ProfileGetPayload<{
  include: {
    businesses: true;
    instructors: true;
    students: true;
  };
}>;

export type BusinessWithStripeAccount = Prisma.BusinessGetPayload<{
  include: {
    stripeAccount: true;
  };
}>;
