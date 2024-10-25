import { getProfile } from "@/queries/profile";
import prisma from "@/libs/prisma";
import { CourseDescription } from "@/libs/types";

export const getCourseDescriptions = async () => {
  const profile = await getProfile();
  if (!profile) {
    throw new Error("No profile is currently authenticated.");
  }

  try {
    const courseDescriptions = await prisma.courseDescription.findMany({
      where: { business: { profileId: profile.id } },
      include: { courseDescriptionImages: { include: { image: true } } },
    });
    return courseDescriptions;
  } catch (error) {
    throw new Error(`There was a problem while course descriptions: ${error}`);
  }
};

export const getCourseDescription = async (
  id: string,
): Promise<CourseDescription | null> => {
  const profile = await getProfile();
  if (!profile) {
    throw new Error(
      `No profile is associated with this course description: ID ${id}`,
    );
  }

  try {
    const courseDescription = await prisma.courseDescription.findFirst({
      where: { id, business: { profileId: profile.id } },
      include: { courseDescriptionImages: { include: { image: true } } },
    });
    return courseDescription;
  } catch (error) {
    throw new Error(
      `There was a problem while finding a course description with ID ${id}: ${error}`,
    );
  }
};
