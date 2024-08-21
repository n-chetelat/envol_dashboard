import prisma from "@/libs/prisma";
import { Student } from "@/libs/types";

export const getStudent = async (
  profileId: string,
): Promise<Student | null> => {
  return await prisma.student.findFirst({
    where: { profileId },
  });
};
