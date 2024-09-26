"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import { useForm, FieldError } from "react-hook-form";
import { CourseDescription } from "@/libs/types";
import TextInput from "@/components/forms/TextInput";
import MultiFileUpload from "./MultiFileUpload";
import Button from "@/components/forms/Button";
import { translateError } from "@/libs/utils";
import { isFieldRequired } from "@/libs/validation";
import {
  BusinessCourseDescFormSchema,
  BusinessCourseDescFormSchemaType,
} from "@/validations/businessCourseDescForm";
import { zodResolver } from "@hookform/resolvers/zod";

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
  const [images, setImages] = useState<File[]>([]);

  const {
    register,
    formState: { errors, isValid, isSubmitting },
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
          inputParams={register("name")}
          errors={te(errors.name)}
          label={t("common.name")}
          required={isRequired("name")}
        />
        <TextInput
          inputParams={register("description")}
          errors={te(errors.description)}
          label={t("common.description")}
          required={isRequired("description")}
        />
        <TextInput
          inputParams={register("requirements")}
          errors={te(errors.requirements)}
          label={t("common.requirements")}
          required={isRequired("requirements")}
        />
        <MultiFileUpload
          name={"images"}
          label={t("common.images")}
          required={isRequired("images")}
          className="max-w-md"
          control={control}
        />
        <Button isSubmitting={isSubmitting} isValid={isValid}>
          {t("common.submit")}
        </Button>
      </form>
    </>
  );
}