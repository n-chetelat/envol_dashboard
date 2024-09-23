import { put, BlobAccessError } from "@vercel/blob";

export async function uploadFile(file: File) {
  try {
    const blob = await put(file.name, file, { access: "public" });
    return blob;
  } catch (error) {
    if (error instanceof BlobAccessError) {
      console.log(`There was a problem saving the file ${file.name}`);
      console.log(error);
    } else {
      throw error;
    }
  }
}
