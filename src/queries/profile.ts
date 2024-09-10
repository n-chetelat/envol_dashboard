import prisma from "@/libs/prisma";
import { unstable_cache } from "next/cache";

export const getProfile = unstable_cache(
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
