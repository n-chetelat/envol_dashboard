"use server";

import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";

export const createProfile = async (data: Prisma.ProfileCreateInput) => {
  const result = await prisma.profile.create({
    data: data,
  });
};

export const createStudentProfile = async (
  data: Prisma.StudentProfileCreateInput,
) => {
  const result = await prisma.studentProfile.create({
    data: { ...data },
  });
};

export const createInstructorProfile = async (
  data: Prisma.InstructorProfileCreateInput,
) => {
  const result = await prisma.instructorProfile.create({
    data: { ...data },
  });
};

export const createBusinessProfile = async (
  data: Prisma.BusinessProfileCreateInput,
) => {
  const result = await prisma.businessProfile.create({
    data: { ...data },
  });
};
