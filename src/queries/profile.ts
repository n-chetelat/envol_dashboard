import prisma from "@/libs/prisma";
import { auth } from "@clerk/nextjs/server";

export const getProfile = async () => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  return await prisma.profile.findFirst({
    where: { userId },
    include: {
      student: true,
      instructor: true,
      business: true,
    },
  });
};
