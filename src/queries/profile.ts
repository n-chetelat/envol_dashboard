"use server";

import prisma from "@/libs/prisma";
import { auth, currentUser } from "@clerk/nextjs/server";
import { ProfileFormSchemaType } from "@/validations/profileForm";
import { clerkClient } from "@clerk/nextjs/server";

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

export const createProfile = async (data: ProfileFormSchemaType) => {
  const { userId } = auth();
  if (!userId) {
    throw new Error("No authenticated user was found to create profile.");
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
  data: ProfileFormSchemaType,
) => {
  const user = await currentUser();
  if (!user) {
    throw new Error("No authenticated user was found to update profile.");
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
  const { userId } = auth();
  if (!userId) {
    throw new Error("No authenticated user was found to delete profile.");
  }
  try {
    const profile = await prisma.profile.delete({
      where: { id },
    });
    if (profile) {
      await clerkClient().users.deleteUser(userId);
    }
  } catch (error) {
    console.log(error);
    throw new Error("Failed to delete profile.");
  }
};
