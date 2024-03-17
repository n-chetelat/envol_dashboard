"use client";

import { Profile, Student } from "@prisma/client";

export default function StudentCourses({
  profile,
  student,
}: StudentCoursesProps) {
  return (
    <div>
      The student classes component. List classes on student schedule. Button to
      sign up to new class
    </div>
  );
}

type StudentCoursesProps = {
  profile: Profile | null;
  student: Student | null;
};
