import prisma from "@/libs/prisma";
import { unstable_cache } from "next/cache";

import {
  Business,
  CourseListing,
  BusinessWithStripeAccount,
} from "@/libs/types";

export const getBusiness = unstable_cache(
  async (profileId: string): Promise<Business | null> => {
    return await prisma.business.findFirst({
      where: { profileId },
    });
  },
  ["business"],
);

export const getBusinessWithStripeAccount = unstable_cache(
  async (profileId: string): Promise<BusinessWithStripeAccount | null> => {
    return await prisma.business.findFirst({
      where: { profileId },
      include: {
        stripeAccount: true,
      },
    });
  },
  ["business-with-stripe-account"],
);

export const getBusnessCourseListings = unstable_cache(
  async (businessId: string): Promise<CourseListing[]> => {
    return await prisma.courseListing.findMany({
      where: { businessId },
    });
  },
  ["business-with-course-listings"],
);
