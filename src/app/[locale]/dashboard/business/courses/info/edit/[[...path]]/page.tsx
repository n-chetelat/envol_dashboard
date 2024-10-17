import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { getBusiness } from "@/queries/business";
import { getCourseDescription } from "@/queries/course";
import { Business, CourseDescription } from "@/libs/types";
import BusinessCoursesInfoForm from "@/components/forms/BusinessCourseDescForm";

export default async function BusinessCoursesInfoEditPage({
  locale,
  params,
}: {
  locale: string;
  params: { path?: string[] };
}) {
  unstable_setRequestLocale(locale);

  // if the path has more params after /edit/{id}, it is invalid
  if (params.path && params.path.length > 1) {
    notFound();
  }

  let business: Business | null = null;
  try {
    business = await getBusiness();
  } catch (error) {
    console.log(
      "There was an error while fetching the business profile for this account",
    );
  }

  // It is valid to have either no params (create) or one id param (edit)
  const businessCourseDescriptionId = params.path ? params.path[0] : undefined;
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

  return (
    <>
      {business ? (
        <BusinessCoursesInfoForm
          businessId={business.id}
          businessCourseDescription={businessCourseDescription}
        />
      ) : null}
    </>
  );
}
