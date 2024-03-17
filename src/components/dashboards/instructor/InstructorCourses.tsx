"use client";

import { Profile, Instructor } from "@prisma/client";

export default function InstructorCourses({
  profile,
  instructor,
}: InstructorCoursesProps) {
  return (
    <div>
      The instructor classes component. List classes on instructor schedule.
    </div>
  );
}

type InstructorCoursesProps = {
  profile: Profile | null;
  instructor: Instructor | null;
};
