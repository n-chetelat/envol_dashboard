import { Prisma } from "@prisma/client";

export type ProfileType = "business" | "instructor" | "student" | null;

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
