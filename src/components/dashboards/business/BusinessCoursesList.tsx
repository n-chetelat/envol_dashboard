"use client";

import { useTranslations } from "next-intl";
import { CourseListing } from "@prisma/client";
import BusinessClassesItem from "@/components/dashboards/business/BusinessCoursesItem";

export default function BusinessClassesList({
  courseListings,
}: BusinessCoursesListProps) {
  const t = useTranslations("courses");
  return (
    <div>
      <h1 className="m-4 text-center text-2xl font-bold uppercase">
        {t("yourClasses")}
      </h1>
      <ul>
        {courseListings.map((courseListing) => (
          <BusinessClassesItem
            courseListing={courseListing}
            key={courseListing.id}
          />
        ))}
      </ul>
    </div>
  );
}

type BusinessCoursesListProps = {
  courseListings: CourseListing[];
};
