import { getProfile } from "@/queries/profile";
import prisma from "@/libs/prisma";
import { Business } from "@/libs/types";

export const getBusiness = async (): Promise<Business | null> => {
  const profile = await getProfile();
  if (!profile) {
    throw new Error("No profile was found for this user");
  }
  return await prisma.business.findFirst({
    where: { profileId: profile.id },
    include: {
      stripeAccount: true,
    },
  });
};
