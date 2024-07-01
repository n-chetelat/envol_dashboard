"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { CourseListing, Course } from "@prisma/client";

export default function BusinessClassesItem({
  courseListing,
}: BusinessCoursesItemProps) {
  const t = useTranslations("common");
  const [course, setCourse] = useState<Course | null>(null);

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const response = await fetch(`/api/courses/${courseListing.courseId}`);
        const course: Course = await response.json();
        setCourse(course);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCourse();
  }, []);

  return <>{course && <li key={courseListing.id}>{course.name}</li>}</>;
}

type BusinessCoursesItemProps = {
  courseListing: CourseListing;
};
