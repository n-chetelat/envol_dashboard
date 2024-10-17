import { getProfile } from "@/queries/profile";
import prisma from "@/libs/prisma";
import { CourseDescription } from "@/libs/types";

export const getCourseDescription = async (
  id: string,
): Promise<CourseDescription | null> => {
  const profile = await getProfile();
  if (!profile) {
    throw new Error(
      `No profile is associated with this course description: ID ${id}`,
    );
  }

  const business = await prisma.business.findFirst({
    where: { profileId: profile.id },
    select: {
      courseDescriptions: {
        where: { id },
        include: { courseDescriptionImages: { include: { image: true } } },
      },
    },
  });

  if (!business?.courseDescriptions.length)
    throw new Error(
      `No business is associated with this course description: ID ${id}`,
    );

  return business.courseDescriptions[0];
};
