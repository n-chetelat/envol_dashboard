import { unstable_setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getBusiness } from "@/queries/business";
import { getCourseDescription } from "@/queries/course";
import { Pencil } from "@/libs/icons";
import { Business, CourseDescription } from "@/libs/types";
import BusinessCoursesInfo from "@/components/dashboards/business/BusinessCourseInfo";
import Button from "@/components/forms/components/Button";

export default async function BusinessCoursesInfoPage({
  locale,
  params,
}: {
  locale: string;
  params: { id: string };
}) {
  unstable_setRequestLocale(locale);
  const t = await getTranslations();

  let business: Business | null = null;
  try {
    business = await getBusiness();
  } catch (error) {
    console.log(
      "There was an error while fetching the business profile for this account",
    );
  }

  const businessCourseDescriptionId = params.id;
  let businessCourseDescription: CourseDescription | null = null;
  if (businessCourseDescriptionId) {
    try {
      businessCourseDescription = await getCourseDescription(
        businessCourseDescriptionId,
      );
    } catch (error) {
      console.log(
        `There was a problem while fetching course description with ID ${businessCourseDescriptionId}:`,
        error,
      );
    }
  }

  // In case the course description ID is invalid for this profile
  if (businessCourseDescriptionId && !businessCourseDescription) {
    notFound();
  }

  return (
    <>
      {businessCourseDescription ? (
        <div className="flex flex-row p-8 justify-between gap-4">
          <div className="flex-1">
            <h2 className="title mb-4">{businessCourseDescription.name}</h2>
            <BusinessCoursesInfo
              businessCourseDescription={businessCourseDescription}
            />
          </div>

          <a
            href={`/dashboard/business/courses/info/${businessCourseDescriptionId}/edit`}
          >
            <Button
              isSubmitting={false}
              className="py-2 px-4 flex flex-row gap-2"
            >
              <Pencil size={20} />
              {t("common.edit")}
            </Button>
          </a>
        </div>
      ) : null}
    </>
  );
}
