"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { X } from "@/libs/icons";
import { cn } from "@/libs/utils";
import { FileThumbnail } from "@/components/forms/components/FileThumbnail";

interface FilePreviewProps {
  file: File;
  onRemove: () => void;
  className?: string;
}

export const FilePreview = ({
  file,
  onRemove,
  className,
}: FilePreviewProps) => {
  const t = useTranslations("aria");
  return (
    <div className={cn("group relative", className)}>
      <FileThumbnail file={file} />
      <button
        onClick={onRemove}
        className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-violet text-white transition-colors group-hover:bg-violet-light"
        aria-label={t("removeFile")}
      >
        <X />
      </button>
      <div className="mt-2 overflow-hidden text-ellipsis whitespace-nowrap text-center text-sm">
        {file.name}
      </div>
    </div>
  );
};
