"use server";

import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { BusinessWithStripeAccount } from "@/types";

export const getBusinessWithStripeAccount = async (
  profileId: string,
): Promise<BusinessWithStripeAccount | null> => {
  return await prisma.business.findFirst({
    where: { profileId: profileId },
    include: {
      stripeAccount: true,
    },
  });
};
