"use client";

import { ChangeEvent, useEffect, useId, useRef, useState } from "react";
import { Control, useController } from "react-hook-form";
import { useTranslations } from "next-intl";
import useTranslatedError from "@/hooks/useTranslatedError";
import { cn } from "@/libs/utils";
import { FilePreview } from "@/components/forms/components/FilePreview";

interface MultiFileUploadProps {
  name: string;
  control: Control<any>;
  className?: string;
  label: string;
  required: boolean;
  allowedTypes?: string[];
  files?: File[];
}

const MultiFileUpload = ({
  name,
  control,
  className,
  label,
  required,
  allowedTypes = [],
  files = [],
}: MultiFileUploadProps) => {
  const t = useTranslations();
  const [fileList, setFileList] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const id = useId();

  const {
    field: { onChange },
    fieldState: { error },
  } = useController({
    name: name,
    control,
    rules: { required },
    defaultValue: [],
  });

  useEffect(() => {
    if (files.length) {
      setFileList(files);
    }
  }, [files]);

  const translatedError = useTranslatedError(error, t);

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const newFiles = Array.from(event.target.files);
      const updatedFiles = [...fileList, ...newFiles];
      setFileList(updatedFiles);
      onChange(updatedFiles);
    }
  };

  const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files && event.dataTransfer.files.length > 0) {
      const newFiles = Array.from(event.dataTransfer.files);
      const updatedFiles = [...fileList, ...newFiles];
      setFileList(updatedFiles);
      onChange(updatedFiles);
    }
  };

  const removeFile = (index: number) => {
    const updatedFiles = fileList.filter((_, i) => i !== index);
    setFileList(updatedFiles);
    onChange(updatedFiles);
  };

  return (
    <div className={className}>
      <label htmlFor={id}>
        {label} {required && <span className="font-bold text-violet">*</span>}
      </label>
      <div
        className={
          "rounded-md border-2 border-dashed border-gray-300 p-4 flex flex-col items-center"
        }
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <input
          type="file"
          id={id}
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          className="hidden"
          accept={allowedTypes.join(",")}
        />
        <button
          type="button"
          className={cn("px-4 py-2", "btn-primary")}
          onClick={() => fileInputRef.current?.click()}
        >
          {t("common.selectFiles")}
        </button>
        <p className="mt-2">{t("common.dragAndDrop")}</p>
        {fileList.length > 0 && (
          <ul className="mt-4 grid grid-cols-static-2 gap-4 lg:grid-cols-static-4">
            {fileList.map((file, index) => (
              <li key={file.name}>
                <FilePreview file={file} onRemove={() => removeFile(index)} />
              </li>
            ))}
          </ul>
        )}
      </div>
      <p className="h-8 text-error">{translatedError?.message}</p>
    </div>
  );
};

export default MultiFileUpload;
