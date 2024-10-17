"use server";

import { CourseDescriptionImage } from "@prisma/client";
import prisma from "@/libs/prisma";

type CourseDescriptionData = {
  name: string;
  description: string;
  requirements: string;
  imagesInfo: { name: string; type: string; url: string }[];
  businessId: string;
};

export const createCourseDescription = async (data: CourseDescriptionData) => {
  try {
    const { name, description, requirements, businessId, imagesInfo } = data;
    const courseDescription = await prisma.courseDescription.create({
      data: { name, description, requirements, businessId },
    });
    if (courseDescription && imagesInfo.length) {
      const promises: Promise<CourseDescriptionImage>[] = [];
      imagesInfo.forEach((imageInfo) => {
        promises.push(
          prisma.courseDescriptionImage.create({
            data: {
              courseDescription: { connect: { id: courseDescription.id } },
              image: {
                create: {
                  name: imageInfo.name,
                  type: imageInfo.type,
                  url: imageInfo.url,
                },
              },
            },
          }),
        );
      });
      await Promise.all(promises);
    }

    return await prisma.courseDescription.findFirst({
      where: { id: courseDescription.id },
      include: { courseDescriptionImages: { include: { image: true } } },
    });
  } catch (error) {
    throw new Error(`Error while creating course description: ${error}`);
  }
};

export const updateCourseDescription = async (
  id: string,
  data: CourseDescriptionData,
) => {
  try {
    const { name, description, requirements, businessId, imagesInfo } = data;
    const courseDescription = await prisma.courseDescription.update({
      where: { id },
      data: { name, description, requirements, businessId },
    });
    return await prisma.courseDescription.findFirst({
      where: { id: courseDescription.id },
      include: { courseDescriptionImages: { include: { image: true } } },
    });
  } catch (error) {
    throw new Error(`Error while updating course description: ${error}`);
  }
};
