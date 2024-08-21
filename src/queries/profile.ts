import prisma from "@/libs/prisma";
import { unstable_cache } from "next/cache";

export const getUserProfile = unstable_cache(
  async (userId: string) => {
    return await prisma.profile.findFirst({
      where: { userId },
    });
  },
  ["profile"],
);

export const getUserProfileWithProfileTypes = unstable_cache(
  async (userId: string) => {
    return await prisma.profile.findFirst({
      where: { userId },
      include: {
        student: true,
        instructor: true,
        business: true,
      },
    });
  },
  ["profile-with-profile-types"],
);
