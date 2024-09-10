import prisma from "@/libs/prisma";
import { BusinessWithStripeAccount } from "@/libs/types";

export const getBusiness = async (
  profileId: string,
): Promise<BusinessWithStripeAccount | null> => {
  return await prisma.business.findFirst({
    where: { profileId },
    include: {
      stripeAccount: true,
    },
  });
};
