"use server";

import prisma from "@/libs/prisma";
import { Prisma } from "@prisma/client";

export const createProfile = async (data: Prisma.ProfileCreateInput) => {
  const result = await prisma.profile.create({
    data: data,
  });
};

export const createStudent = async (data: Prisma.StudentCreateInput) => {
  const result = await prisma.student.create({
    data: { ...data },
  });
};

export const createInstructor = async (data: Prisma.InstructorCreateInput) => {
  const result = await prisma.instructor.create({
    data: { ...data },
  });
};

export const createBusiness = async (data: Prisma.BusinessCreateInput) => {
  const result = await prisma.business.create({
    data: { ...data },
  });
};
