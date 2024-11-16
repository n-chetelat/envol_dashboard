"use client";

import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  createCourseDescription,
  updateCourseDescription,
} from "@/actions/course";
import { saveFilesToStorage } from "@/queries/file";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFiles } from "@/hooks/useFiles";
import { ACCEPTED_IMAGE_TYPES } from "@/libs/constants";
import { useRouter } from "@/libs/navigation";
import { showErrorToast } from "@/libs/toast";
import { CourseDescription, FileWithBlob } from "@/libs/types";
import { FileMetadata } from "@/libs/types";
import { isFieldRequired } from "@/libs/validation";
import {
  BusinessCourseDescFormSchema,
  BusinessCourseDescFormSchemaType,
} from "@/validations/businessCourseDescForm";
import Button from "@/components/buttons/Button";
import MultiFileUpload from "@/components/forms/components/MultiFileUpload";
import TextAreaInput from "@/components/forms/components/TextAreaInput";
import TextInput from "@/components/forms/components/TextInput";

type BusinessCoursesInfoFormProps = {
  businessCourseDescription: CourseDescription | null;
  businessId: string;
};

export default function BusinessCoursesInfoForm({
  businessCourseDescription,
  businessId,
}: BusinessCoursesInfoFormProps) {
  const t = useTranslations();
  const router = useRouter();
  const isRequired = (fieldName: string) =>
    isFieldRequired(BusinessCourseDescFormSchema, fieldName);
  const images = businessCourseDescription?.courseDescriptionImages.map(
    (cdi) => cdi.image,
  );
  const { filesWithBlob } = useFiles(images || [], businessCourseDescription);

  const {
    formState: { isValid, isSubmitting, dirtyFields },
    handleSubmit,
    control,
  } = useForm<BusinessCourseDescFormSchemaType>({
    resolver: zodResolver(BusinessCourseDescFormSchema),
    mode: "onChange",
    defaultValues: businessCourseDescription
      ? {
          name: businessCourseDescription.name,
          description: businessCourseDescription.description,
          requirements: businessCourseDescription.requirements,
        }
      : {},
  });

  const handleSubmitCourseDesc = async (
    data: BusinessCourseDescFormSchemaType,
  ) => {
    try {
      // Store newly uploaded images if any
      const currentImages = data.images?.length ? data.images : filesWithBlob;
      const imagesInfo: FileMetadata[] = await saveFilesToStorage(
        currentImages as FileWithBlob[],
      );
      // Store remaining course description information
      const courseDescription = await saveCourseDescription({
        name: data.name,
        description: data.description || "",
        requirements: data.requirements || "",
        imagesInfo,
      });

      if (!courseDescription) {
        throw new Error("Failed to save course description.");
      } else {
        router.push(`/dashboard/business/courses/info/${courseDescription.id}`);
      }
    } catch (error) {
      showErrorToast(t("errors.failedToSave"));
      console.log(error);
    }
  };

  const saveCourseDescription = async (data: {
    name: string;
    description: string;
    requirements: string;
    imagesInfo: FileMetadata[];
  }): Promise<CourseDescription | null> => {
    const courseDescriptionData = { ...data, businessId };
    if (businessCourseDescription?.id) {
      // Update existing course description
      return await updateCourseDescription(
        businessCourseDescription.id,
        courseDescriptionData,
      );
    } else {
      return await createCourseDescription(courseDescriptionData);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitCourseDesc)}>
      <TextInput
        name="name"
        control={control}
        label={t("common.name")}
        required={isRequired("name")}
      />
      <TextAreaInput
        name="description"
        control={control}
        label={t("common.description")}
        required={isRequired("description")}
      />
      <TextAreaInput
        name="requirements"
        control={control}
        label={t("common.requirements")}
        required={isRequired("requirements")}
      />
      <MultiFileUpload
        name={"images"}
        label={t("common.images")}
        required={isRequired("images")}
        className="max-w-xs lg:max-w-lg"
        control={control}
        allowedTypes={ACCEPTED_IMAGE_TYPES}
        files={filesWithBlob}
      />
      <Button
        isSubmitting={isSubmitting}
        isValid={!!Object.keys(dirtyFields).length && isValid}
        className="py-2 px-4"
      >
        {t("common.save")}
      </Button>
    </form>
  );
}
