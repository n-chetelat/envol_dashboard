"use server";

import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";

export const createProfile = async (data: Prisma.ProfileCreateInput) => {
  const result = await prisma.profile.create({
    data: { ...data },
  });
};
