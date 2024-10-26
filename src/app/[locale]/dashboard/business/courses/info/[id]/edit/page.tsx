import { unstable_setRequestLocale } from "next-intl/server";
import { getTranslations } from "next-intl/server";
import { notFound } from "next/navigation";
import { getBusiness } from "@/queries/business";
import { getCourseDescription } from "@/queries/course";
import { Business, CourseDescription } from "@/libs/types";
import BusinessCoursesInfoForm from "@/components/forms/BusinessCourseDescForm";
import BackLink from "@/components/navigation/BackLink";

export default async function BusinessCoursesInfoEditPage({
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
      {business ? (
        <div className="flex flex-col p-8 justify-between gap-4">
          <h2 className="title">{t("courses.editClassDesc")}</h2>

          <BackLink
            href={`/dashboard/business/courses/info/${businessCourseDescriptionId}`}
          />

          <BusinessCoursesInfoForm
            businessId={business.id}
            businessCourseDescription={businessCourseDescription}
          />
        </div>
      ) : null}
    </>
  );
}
