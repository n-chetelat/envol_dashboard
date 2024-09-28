import { cn } from "@/libs/utils";
import Image from "next/image";
import { useEffect, useState } from "react";

interface FileThumbnailProps {
  file: File;
  className?: string;
}

export const FileThumbnail = ({ file, className }: FileThumbnailProps) => {
  const [thumbnail, setThumbnail] = useState<string | null>(null);

  useEffect(() => {
    let objectUrl: string | null = null;

    if (file.type.startsWith("image/") || file.type.startsWith("video/")) {
      objectUrl = URL.createObjectURL(file);
      setThumbnail(objectUrl);
    } else {
      setThumbnail(`/default-file.svg`);
    }

    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [file]);

  return (
    <div className={cn("relative h-16 w-16", className)}>
      {thumbnail ? (
        <Image src={thumbnail} alt={file.name} fill className="rounded-md" />
      ) : (
        <div className="flex h-full w-full items-center justify-center rounded-md bg-gray-200">
          <span className="text-xs">No preview</span>
        </div>
      )}
    </div>
  );
};
