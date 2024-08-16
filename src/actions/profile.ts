"use server";

import prisma from "@/libs/prisma";
import { auth } from "@clerk/nextjs";

export const getUserProfile = async () => {
  const { userId } = auth();
  if (!userId) return null;

  return await prisma.profile.findFirst({
    where: { userId },
  });
};

export const getUserProfileWithProfileTypes = async () => {
  const { userId } = auth();
  if (!userId) return null;

  return await prisma.profile.findFirst({
    where: { userId },
    include: {
      students: true,
      instructors: true,
      businesses: true,
    },
  });
};
