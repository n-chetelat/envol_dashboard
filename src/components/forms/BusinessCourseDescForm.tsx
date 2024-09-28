"use client";

import { useTranslations } from "next-intl";
import { useForm, FieldError } from "react-hook-form";
import { CourseDescription } from "@/libs/types";
import TextInput from "@/components/forms/components/TextInput";
import MultiFileUpload from "./components/MultiFileUpload";
import Button from "@/components/forms/components/Button";
import { translateError } from "@/libs/utils";
import { isFieldRequired } from "@/libs/validation";
import {
  BusinessCourseDescFormSchema,
  BusinessCourseDescFormSchemaType,
} from "@/validations/businessCourseDescForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACCEPTED_IMAGE_TYPES } from "@/libs/constants";

type BusinessCoursesInfoFormProps = {
  businessCourseInfo: CourseDescription | null;
  businessId: string;
};

export default function BusinessCoursesInfoForm({
  businessCourseInfo,
}: BusinessCoursesInfoFormProps) {
  const t = useTranslations();
  const te = (keyErrors: FieldError | undefined) =>
    translateError(t, keyErrors);
  const isRequired = (fieldName: string) =>
    isFieldRequired(BusinessCourseDescFormSchema, fieldName);
  const isNewEntry = !businessCourseInfo;

  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
    control,
  } = useForm<BusinessCourseDescFormSchemaType>({
    resolver: zodResolver(BusinessCourseDescFormSchema),
    mode: "onChange",
    defaultValues: businessCourseInfo
      ? {
          name: businessCourseInfo.name,
          description: businessCourseInfo.description,
          requirements: businessCourseInfo.requirements,
        }
      : {},
  });

  const handleSubmitCourseDesc = async (
    formData: BusinessCourseDescFormSchemaType,
  ) => {
    console.log(formData);
    // save and update course desc
  };

  return (
    <>
      <h2>
        {isNewEntry ? t("courses.newClassDesc") : t("courses.editClassDesc")}
      </h2>
      <form onSubmit={handleSubmit(handleSubmitCourseDesc)}>
        <TextInput
          name="name"
          control={control}
          label={t("common.name")}
          required={isRequired("name")}
        />
        <TextInput
          name="description"
          control={control}
          label={t("common.description")}
          required={isRequired("description")}
        />
        <TextInput
          name="requirements"
          control={control}
          label={t("common.requirements")}
          required={isRequired("requirements")}
        />
        <MultiFileUpload
          name={"images"}
          label={t("common.images")}
          required={isRequired("images")}
          className="max-w-md"
          control={control}
          allowedTypes={ACCEPTED_IMAGE_TYPES}
        />
        <Button isSubmitting={isSubmitting} isValid={isValid}>
          {t("common.submit")}
        </Button>
      </form>
    </>
  );
}
