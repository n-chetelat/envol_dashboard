import { auth } from "@clerk/nextjs/server";
import "server-only";
import { inngest } from "@/libs/inngest";
import prisma from "@/libs/prisma";
import { AttachableType } from "@/libs/types";

/** Find the stored files that are no longer needed by a related table and delete them. E.g. LocationImage, CourseDescriptionImg, etc.
 * @param incomingFileIds: IDs of already stored files that do not need to be removed.
 * @param savedFiles: List of all the files that are currently stored.
 *  */
export const deleteUnusedFiles = async (
  incomingFileIds: string[],
  savedFiles: AttachableType[],
) => {
  try {
    const filesToDelete = savedFiles.filter(
      (i) => !incomingFileIds.includes(i.id),
    );
    const fileIdsToDelete = filesToDelete.map((i) => i.id);
    // Deleting an image should cascade into deleting the join table row it is connected to.
    const deleted = await prisma.image.deleteMany({
      where: { id: { in: fileIdsToDelete as string[] } },
    });
    // Remove files from blob storage
    if (deleted.count) {
      const { getToken } = auth();
      const token = await getToken();
      const urlsToDelete = filesToDelete.map((f) => f.url);
      const deleteFilesRequest = {
        name: "files/delete-file-from-storage",
        data: {
          url: urlsToDelete,
        },
        user: {
          token,
        },
      };
      await inngest.send(deleteFilesRequest);
    }
  } catch (error) {
    throw new Error(`There was a problem while deleting files: ${error}`);
  }
};
