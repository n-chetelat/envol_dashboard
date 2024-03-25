"use server";

import prisma from "@/libs/prisma";

export const createBusiness = async (data: Prisma.BusinessCreateInput) => {
  const result = await prisma.business.create({
    data: data,
  });
};

export const updateBusiness = async (
  id: string,
  data: Prisma.BusinessUpdateInput,
) => {
  const result = await prisma.business.update({
    where: { id },
    data: data,
  });
};
