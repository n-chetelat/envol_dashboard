import { useEffect, useState } from "react";
import { FileMetadata, FileWithBlob } from "@/libs/types";

export const useFiles = (
  files: (FileMetadata & Record<PropertyKey, unknown>)[],
  changeTrigger: any,
) => {
  const [filesWithBlob, setFilesWithBlob] = useState<FileWithBlob[]>([]);

  useEffect(() => {
    const fetchBlobs = async () => {
      if (files.length) {
        const promises = files.map((file) =>
          fetch(file.url as string)
            .then((b) => b.blob())
            .then((b) => new File([b], file.name, { type: file.type }))
            .then((f) => ({ fileId: file.id, remoteUrl: file.url, file: f })),
        );
        const fileResults = await Promise.all(promises);
        setFilesWithBlob(fileResults);
      }
    };
    fetchBlobs();
  }, [changeTrigger]);

  return {
    filesWithBlob,
  };
};
