"use server";

import prisma from "@/libs/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import {
  ProfileFormSchemaType,
  ProfileFormWithoutEmail,
} from "@/validations/profileForm";

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

export const createProfile = async (data: ProfileFormWithoutEmail) => {
  const { userId } = auth();
  if (!userId) {
    return null;
  }
  let profile;

  profile = await prisma.profile.findFirst({
    where: { userId: userId },
  });
  if (profile) {
    throw new Error("A profile already exists for this user.");
  }

  try {
    profile = await prisma.profile.create({
      data: { ...data, userId },
    });
    return profile;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to create profile.");
  }
};

export const updateProfile = async (
  id: string,
  data: ProfileFormWithoutEmail,
) => {
  const user = await currentUser();
  if (!user) {
    return null;
  }
  try {
    const profile = await prisma.profile.update({
      where: { id },
      data,
      include: {
        student: true,
        instructor: true,
        business: true,
      },
    });
    return profile;
  } catch (error) {
    console.log(error);
    throw new Error("Failed to save profile.");
  }
};

export const deleteProfile = async (id: string) => {
  try {
    await prisma.profile.delete({
      where: { id },
    });
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete profile.");
  }
};
