import { FieldError } from "react-hook-form";
import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Error messages in validation schema can have this format for i18n:
// errorKey@arg1::one--arg2::two
export const translateError = (
  t: Function,
  keyErrors: FieldError | undefined,
): Partial<FieldError> | undefined => {
  if (keyErrors?.message) {
    const argObj: { [key: string]: string } = {};
    const [errorKey, argList] = keyErrors.message.split("@");
    if (argList) {
      const args = argList.split("--").map((arg) => arg.split("::"));
      if (args.length) {
        args.forEach((arg) => (argObj[arg[0]] = arg[1]));
      }
    }
    return {
      message: t(`errors.${errorKey}`, argObj),
    };
  }
  return undefined;
};

export const uploadFiles = async (files: File[]) => {
  const fileInfo: { name: string; type: string; url: string }[] = files.map(
    (file) => ({ name: file.name, type: file.type, url: "" }),
  );
  const filesFormData = encodeFilesAsFormData(files);
  const response = await fetch("/api/files", {
    method: "PUT",
    body: filesFormData,
  });
  if (response.ok) {
    const results = await response.json();
    results.forEach((r: any, idx: number) => {
      fileInfo[idx].url = r.url;
    });
    return fileInfo;
  } else {
    throw new Error("Error while uploading files.");
  }
};

export const encodeFilesAsFormData = (files: File[]) => {
  const formData = new FormData();
  files.forEach((file) => {
    formData.append("file[]", file);
  });
  return formData;
};
