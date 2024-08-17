"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Prisma, Business } from "@prisma/client";
import { useTranslations } from "next-intl";
import TextInput from "@/components/forms/TextInput";
import PhoneNumberInput from "@/components/forms/PhoneNumberInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessSettingsFormSchema } from "@/validations/businessSettingsForm";
import CheckboxInput from "@/components/forms/CheckboxInput";
import { BusinessWithStripeAccount } from "@/libs/types";
import { createBusinessSettingsFormSchema } from "@/validations/businessSettingsForm";
import { showSuccessToast, showErrorToast } from "@/libs/toast";
import { isFieldRequired } from "@/libs/validation";

interface BusinessFormProps {
  profileId: string;
  business: BusinessWithStripeAccount | null;
}

export default function BusinessSettingsForm({
  profileId,
  business,
}: BusinessFormProps) {
  const t = useTranslations();
  const BusinessSettingsFormSchema = createBusinessSettingsFormSchema(t);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    control,
    reset,
    getValues,
  } = useForm<Prisma.BusinessCreateInput>({
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
    <div className="paper flex w-1/2 flex-col md:max-w-2xl">
      <h1 className="m-4 text-center text-2xl font-bold uppercase">
        {t("settings.businessTitle")}
      </h1>
      <form className="flex flex-col items-center">
        <TextInput
          inputParams={register("name")}
          errors={errors.name}
          label={t("common.name")}
          required={isFieldRequired(BusinessSettingsFormSchema, "name")}
        />
        <TextInput
          inputParams={register("bio")}
          errors={errors.bio}
          label={t("common.bio")}
          required={isFieldRequired(BusinessSettingsFormSchema, "bio")}
        />
        <TextInput
          inputParams={register("contactEmail")}
          errors={errors.contactEmail}
          label={t("common.email")}
          required={isFieldRequired(BusinessSettingsFormSchema, "contactEmail")}
        />
        <PhoneNumberInput
          inputParams={register("phoneNumber")}
          errors={errors.phoneNumber}
          label={t("common.phoneNumber")}
          formControl={control}
          required={isFieldRequired(BusinessSettingsFormSchema, "phoneNumber")}
        />
        <CheckboxInput
          inputParams={register("published")}
          errors={errors.published}
          label={t("settings.published")}
          required={isFieldRequired(BusinessSettingsFormSchema, "published")}
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
    </div>
  );
}
