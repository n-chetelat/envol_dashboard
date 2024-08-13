"use server";

import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";
import { BusinessWithStripeAccount } from "@/types";

export const createBusiness = async (data: Prisma.BusinessCreateInput) => {
  const result = await prisma.business.create({
    data: data,
  });
};

export const updateBusiness = async (
  id: string,
  data: Prisma.BusinessUpdateInput,
) => {
  const result = await prisma.business.update({
    where: { id },
    data: data,
  });
};

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
