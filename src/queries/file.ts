import { FileMetadata, FileWithBlob } from "@/libs/types";
import { encodeFilesAsFormData } from "@/libs/utils";

// Upload only the files that have not yet been uploaded to blob storage
export const saveFilesToStorage = async (
  files: FileWithBlob[],
): Promise<FileMetadata[]> => {
  if (files.length) {
    const uploadedFilesMetadata: FileMetadata[] = files
      .filter((f) => !!f.fileId)
      .map((f) => ({
        id: f.fileId,
        name: f.file.name,
        type: f.file.type,
        url: f.remoteUrl,
      }));
    const filesWithBlobNotUploaded = files.filter((f) => !f.fileId);
    const newFilesMetadata: { name: string; type: string; url: string }[] =
      filesWithBlobNotUploaded.map((f) => ({
        name: f.file.name,
        type: f.file.type,
        url: "",
      }));
    const filesFormData = encodeFilesAsFormData(
      filesWithBlobNotUploaded.map((f) => f.file),
    );
    const response = await fetch("/api/files", {
      method: "PUT",
      body: filesFormData,
    });
    if (response.ok) {
      const results = await response.json();
      results.forEach((r: any, idx: number) => {
        newFilesMetadata[idx].url = r.url;
      });
      return [...newFilesMetadata, ...uploadedFilesMetadata];
    } else {
      throw new Error("Error while uploading files.");
    }
  } else {
    return [];
  }
};
