"use client";

import { Profile, Business, CourseListing } from "@prisma/client";
import BusinessClassesList from "@/components/dashboards/business/BusinessCoursesList";

export default function BusinessClasses({
  profile,
  business,
  courseListings,
}: BusinessCoursesProps) {
  return (
    <div>
      <BusinessClassesList courseListings={courseListings} />
      The business classes component. List classes (NOT schedule, just all
      created classes). Button to create a class. Create Locations
    </div>
  );
}

type BusinessCoursesProps = {
  profile: Profile | null;
  business: Business | null;
  courseListings: CourseListing[];
};
