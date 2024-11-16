import { auth } from "@clerk/nextjs/server";
import prisma from "@/libs/prisma";

export const getProfile = async () => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("No authenticated user was found to retrieve profile.");
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
