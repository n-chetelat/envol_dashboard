import prisma from "@/libs/prisma";
import {
  Business,
  CourseListing,
  BusinessWithStripeAccount,
} from "@/libs/types";

export const getBusiness = async (
  profileId: string,
): Promise<Business | null> => {
  return await prisma.business.findFirst({
    where: { profileId },
  });
};

export const getBusinessWithStripeAccount = async (
  profileId: string,
): Promise<BusinessWithStripeAccount | null> => {
  return await prisma.business.findFirst({
    where: { profileId },
    include: {
      stripeAccount: true,
    },
  });
};

export const getBusnessCourseListings = async (
  businessId: string,
): Promise<CourseListing[]> => {
  return await prisma.courseListing.findMany({
    where: { businessId },
  });
};
