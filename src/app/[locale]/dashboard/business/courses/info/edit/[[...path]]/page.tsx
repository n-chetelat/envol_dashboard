import { unstable_setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { Business, CourseDescription } from "@/libs/types";
import { getBusiness } from "@/actions/business";
import { getCourseDescription } from "@/actions/course";
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
  const businessCourseInfoId = params.path ? params.path[0] : undefined;
  let businessCourseInfo: CourseDescription | null = null;
  if (businessCourseInfoId) {
    try {
      businessCourseInfo = await getCourseDescription(businessCourseInfoId);
    } catch (error) {
      console.log(
        `There was a problem while fetching course description with ID ${businessCourseInfoId}:`,
        error,
      );
    }
  }

  return (
    <>
      {business ? (
        <BusinessCoursesInfoForm
          businessId={business.id}
          businessCourseInfo={businessCourseInfo}
        />
      ) : null}
    </>
  );
}
