"use server";

import { deleteUnusedFiles } from "@/queries/server_only/file";
import prisma from "@/libs/prisma";
import { FileMetadata } from "@/libs/types";

type CourseDescriptionData = {
  name: string;
  description: string;
  requirements: string;
  imagesInfo: FileMetadata[];
  businessId: string;
};

export const createCourseDescription = async (data: CourseDescriptionData) => {
  try {
    const { name, description, requirements, businessId, imagesInfo } = data;
    const courseDescription = await prisma.courseDescription.create({
      data: { name, description, requirements, businessId },
    });
    if (courseDescription && imagesInfo.length) {
      const newImages = await prisma.image.createManyAndReturn({
        data: imagesInfo.map((imageInfo) => {
          const { name, type, url } = imageInfo;
          return { name, type, url: url as string };
        }),
      });

      await prisma.courseDescriptionImage.createMany({
        data: newImages.map((newImage) => {
          return {
            imageId: newImage.id,
            courseDescriptionId: courseDescription.id,
          };
        }),
      });
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
    // Update information and retrieve existing imges
    const courseDescription = await prisma.courseDescription.update({
      where: { id },
      data: { name, description, requirements, businessId },
      include: {
        courseDescriptionImages: {
          include: { image: true },
        },
      },
    });

    // Delete any images that are no longer needed
    const incomingImageIds = imagesInfo.map((i) => i.id).filter((i) => !!i);
    const savedImages = courseDescription.courseDescriptionImages.map(
      (c) => c.image,
    );
    await deleteUnusedFiles(incomingImageIds as string[], savedImages);

    // Find the images that need to be added
    const imagesToAdd = imagesInfo.filter((i) => !i.id);
    const newImages = await prisma.image.createManyAndReturn({
      data: imagesToAdd.map((i) => {
        if (i.url) {
        }
        const { name, type, url } = i;
        return { name, type, url: url as string };
      }),
    });
    await prisma.courseDescriptionImage.createManyAndReturn({
      data: newImages.map((ni) => ({
        courseDescriptionId: id,
        imageId: ni.id,
      })),
    });

    return await prisma.courseDescription.findFirst({
      where: { id: courseDescription.id },
      include: { courseDescriptionImages: { include: { image: true } } },
    });
  } catch (error) {
    throw new Error(`Error while updating course description: ${error}`);
  }
};
