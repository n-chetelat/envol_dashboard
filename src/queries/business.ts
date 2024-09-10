import prisma from "@/libs/prisma";
import { unstable_cache } from "next/cache";

import { BusinessWithStripeAccount } from "@/libs/types";

export const getBusiness = unstable_cache(
  async (profileId: string): Promise<BusinessWithStripeAccount | null> => {
    return await prisma.business.findFirst({
      where: { profileId },
      include: {
        stripeAccount: true,
      },
    });
  },
  ["business"],
  { tags: ["business"] },
);
