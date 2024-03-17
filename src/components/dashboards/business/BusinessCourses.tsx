"use client";

import { Profile, Business, Course } from "@prisma/client";

export default function BusinessClasses({
  profile,
  business,
  courses,
}: BusinessCoursesProps) {
  return (
    <div>
      The business classes component. List classes (NOT schedule, just all
      created classes). Button to create a class
    </div>
  );
}

type BusinessCoursesProps = {
  profile: Profile | null;
  business: Business | null;
  courses: Course[];
};
