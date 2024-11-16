import { getTranslations } from "next-intl/server";
import Image from "next/image";
import { Link } from "@/libs/navigation";
import { CourseDescription } from "@/libs/types";

type BusinessCourseInfoCardProps = {
  businessCourseInfo: CourseDescription;
};

export default async function BusinessCourseInfoCard({
  businessCourseInfo,
}: BusinessCourseInfoCardProps) {
  const t = await getTranslations();
  let imageSrc = "/default-file.svg";
  if (businessCourseInfo.courseDescriptionImages.length) {
    const image = businessCourseInfo.courseDescriptionImages[0].image;
    imageSrc = image.url;
  }
  return (
    <div className="flex flex-row gap-4 border border-lilac rounded">
      <div className="relative h-48 min-w-48">
        <Image
          src={imageSrc}
          alt={t("aria.coverImage")}
          fill
          className="rounded"
        ></Image>
      </div>
      <div className="h-48 p-4">
        <div className="flex-col gap-2">
          <Link
            href={`/dashboard/business/courses/info/${businessCourseInfo.id}`}
          >
            <h3 className="subtitle text-violet hover:text-violet-dark hover:underline">
              {businessCourseInfo.name}
            </h3>
          </Link>
          <p className="overflow-hidden whitespace-pre-wrap flex-1 line-clamp-4">
            {businessCourseInfo.description}
          </p>
        </div>
      </div>
    </div>
  );
}
