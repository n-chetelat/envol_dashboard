import prisma from "@/libs/prisma";
import { unstable_cache } from "next/cache";
import { Student } from "@/libs/types";

export const getStudent = unstable_cache(
  async (profileId: string): Promise<Student | null> => {
    return await prisma.student.findFirst({
      where: { profileId },
    });
  },
  ["student"],
);
