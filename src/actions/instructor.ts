import prisma from "@/libs/prisma";
import { Instructor } from "@/libs/types";

export const getInstructor = async (
  profileId: string,
): Promise<Instructor | null> => {
  return await prisma.instructor.findFirst({
    where: { profileId },
  });
};
