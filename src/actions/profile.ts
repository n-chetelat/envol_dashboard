"use server";

import prisma from "@/libs/prisma";
import { currentUser } from "@clerk/nextjs";

export const getUserProfile = async () => {
  const user = await currentUser();
  if (!user?.id) return null;

  return await prisma.profile.findFirst({
    where: { userId: user.id },
  });
};
