"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import {
  createCourseDescription,
  updateCourseDescription,
} from "@/actions/course";
import { zodResolver } from "@hookform/resolvers/zod";
import { ACCEPTED_IMAGE_TYPES } from "@/libs/constants";
import { useRouter } from "@/libs/navigation";
import { showErrorToast } from "@/libs/toast";
import { CourseDescription } from "@/libs/types";
import { FileInfo, FileWithId } from "@/libs/types";
import { uploadFiles } from "@/libs/utils";
import { isFieldRequired } from "@/libs/validation";
import {
  BusinessCourseDescFormSchema,
  BusinessCourseDescFormSchemaType,
} from "@/validations/businessCourseDescForm";
import Button from "@/components/forms/components/Button";
import MultiFileUpload from "@/components/forms/components/MultiFileUpload";
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
  const [fileList, setFileList] = useState<FileWithId[]>([]);

  useEffect(() => {
    const fetchBlobs = async () => {
      if (businessCourseDescription?.courseDescriptionImages.length) {
        const images = businessCourseDescription.courseDescriptionImages.map(
          (cdi) => cdi.image,
        );
        const promises = images.map((image) =>
          fetch(image.url)
            .then((b) => b.blob())
            .then((b) => new File([b], image.name, { type: image.type }))
            .then((file) => ({ fileId: image.id, remoteUrl: image.url, file })),
        );
        const files = await Promise.all(promises);
        setFileList(files);
      }
    };
    fetchBlobs();
  }, [businessCourseDescription]);

  const {
    formState: { isValid, isSubmitting },
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
      let imagesInfo: FileInfo[] = [];
      // Store newly uploaded images if any
      if (data.images?.length) {
        const uploadedFiles: FileInfo[] = data.images
          .filter((f) => !!f.fileId)
          .map((f) => ({
            id: f.fileId,
            name: f.file.name,
            type: f.file.type,
            url: f.remoteUrl,
          }));
        const filesNotUploaded = data.images.filter((f) => !f.fileId);
        imagesInfo = await uploadFiles(filesNotUploaded);
        imagesInfo = [...imagesInfo, ...uploadedFiles];
      }
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
        router.push(
          `/dashboard/business/courses/info/edit/${courseDescription.id}`,
        );
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
    imagesInfo: FileInfo[];
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
        className="max-w-xs lg:max-w-lg"
        control={control}
        allowedTypes={ACCEPTED_IMAGE_TYPES}
        files={fileList}
      />
      <Button isSubmitting={isSubmitting} isValid={isValid} className="p-4">
        {t("common.submit")}
      </Button>
    </form>
  );
}
