"use client";

import { useTranslations } from "next-intl";
import { useFiles } from "@/hooks/useFiles";
import { CourseDescription } from "@/libs/types";
import { cn } from "@/libs/utils";
import { FilePreview } from "@/components/forms/components/FilePreview";
import TextField from "@/components/text/TextField";

type BusinessCoursesInfoProps = {
  businessCourseDescription: CourseDescription;
  className?: string;
};

export default function BusinessCoursesInfo({
  businessCourseDescription,
  className,
}: BusinessCoursesInfoProps) {
  const t = useTranslations();
  const images = businessCourseDescription?.courseDescriptionImages.map(
    (cdi) => cdi.image,
  );
  const { filesWithBlob } = useFiles(images || [], businessCourseDescription);

  return (
    <div className={cn("flex flex-col", className)}>
      <TextField
        label={t("common.description")}
        content={businessCourseDescription.description}
      />
      <TextField
        label={t("common.requirements")}
        content={businessCourseDescription.requirements}
      />
      {filesWithBlob.length > 0 && (
        <ul className="mt-4 grid grid-cols-static-2 gap-4 lg:grid-cols-static-4">
          {filesWithBlob.map((f) => (
            <li key={f.remoteUrl}>
              <FilePreview file={f.file} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
