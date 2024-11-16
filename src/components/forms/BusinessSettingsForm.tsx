"use client";

import CheckboxInput from "@/components/forms/components/CheckboxInput";
import PhoneNumberInput from "@/components/forms/components/PhoneNumberInput";
import TextInput from "@/components/forms/components/TextInput";
import { showErrorToast, showSuccessToast } from "@/libs/toast";
import { Business } from "@/libs/types";
import { translateError } from "@/libs/utils";
import { isFieldRequired } from "@/libs/validation";
import {
  BusinessSettingsFormSchema,
  BusinessSettingsFormSchemaType,
} from "@/validations/businessSettingsForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useEffect } from "react";
import { FieldError, useForm } from "react-hook-form";

interface BusinessFormProps {
  profileId: string;
  business: Business | null;
}

export default function BusinessSettingsForm({
  profileId,
  business,
}: BusinessFormProps) {
  const t = useTranslations();
  const te = (keyErrors: FieldError | undefined) =>
    translateError(t, keyErrors);
  const isRequired = (fieldName: string) =>
    isFieldRequired(BusinessSettingsFormSchema, fieldName);
  const {
    formState: { isValid },
    control,
    reset,
    getValues,
  } = useForm<BusinessSettingsFormSchemaType>({
    defaultValues: business
      ? {
          name: business.name || "",
          bio: business.bio || "",
          contactEmail: business.contactEmail || "",
          phoneNumber: business.phoneNumber || "",
          published: business.published || false,
        }
      : {},
    resolver: zodResolver(BusinessSettingsFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    reset();
  }, [business, reset]);

  const handleCreateOrUpdateBusiness = async () => {
    const { name, bio, contactEmail, phoneNumber, published } = getValues();
    const businessData = {
      name,
      bio,
      contactEmail,
      phoneNumber,
      published,
    };

    try {
      let response;

      if (business?.id) {
        response = await fetch(`/api/businesses/${business?.id}`, {
          method: "PUT",
          body: JSON.stringify(businessData),
        });
      } else {
        response = await fetch("api/businesses", {
          method: "POST",
          body: JSON.stringify({ profileId, ...businessData }),
        });
      }

      if (!response.ok) {
        throw new Error("Failed to save business");
      } else {
        showSuccessToast(t("success.saved"));
      }
    } catch (error) {
      showErrorToast(t("errors.failedToSave"));
      console.log(error);
    }
  };

  return (
    <form className="flex flex-col items-center">
      <TextInput
        name="name"
        control={control}
        label={t("common.name")}
        required={isRequired("name")}
      />
      <TextInput
        name="bio"
        control={control}
        label={t("common.bio")}
        required={isRequired("bio")}
      />
      <TextInput
        name="contactEmail"
        control={control}
        label={t("common.email")}
        required={isRequired("contactEmail")}
      />
      <PhoneNumberInput
        name="phoneNumber"
        label={t("common.phoneNumber")}
        control={control}
        required={isRequired("phoneNumber")}
      />
      <CheckboxInput
        name="published"
        control={control}
        label={t("settings.published")}
        required={isRequired("published")}
      />
      <button
        className="btn-primary w-10/12"
        onClick={handleCreateOrUpdateBusiness}
        disabled={!isValid}
        type="button"
      >
        {t("common.submit")}
      </button>
    </form>
  );
}
