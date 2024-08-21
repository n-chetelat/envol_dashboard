import prisma from "@/libs/prisma";
import { unstable_cache } from "next/cache";
import { Instructor } from "@/libs/types";

export const getInstructor = unstable_cache(
  async (profileId: string): Promise<Instructor | null> => {
    return await prisma.instructor.findFirst({
      where: { profileId },
    });
  },
  ["instructor"],
);
