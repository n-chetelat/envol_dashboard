"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { Prisma, Business } from "@prisma/client";
import { useTranslations } from "next-intl";
import TextInput from "@/components/forms/TextInput";
import PhoneNumberInput from "@/components/forms/PhoneNumberInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessSettingsFormSchema } from "@/validations/businessSettingsForm";
import { createBusiness, updateBusiness } from "@/actions/business";
import CheckboxInput from "@/components/forms/CheckboxInput";
import { BusinessWithStripeAccount } from "@/types";

interface BusinessFormProps {
  profileId: string;
  business: BusinessWithStripeAccount | null;
}

export default function BusinessSettingsForm({
  profileId,
  business,
}: BusinessFormProps) {
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
  });

  const t = useTranslations("common");
  const ts = useTranslations("settings");

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
        // Show success message.
        console.log("Saved businesses successfully");
      }
    } catch (error) {
      // show message that something went wrong. toast or such.
      console.log(error);
    }
  };

  return (
    <div className="paper flex w-1/2 flex-col md:max-w-2xl">
      <h1 className="m-4 text-center text-2xl font-bold uppercase">
        {ts("businessTitle")}
      </h1>
      <form className="flex flex-col items-center">
        <TextInput
          inputParams={{ ...register("name"), required: true }}
          errors={errors.name}
          label={t("name")}
        />
        <TextInput
          inputParams={{ ...register("bio"), required: true }}
          errors={errors.bio}
          label={t("bio")}
        />
        <TextInput
          inputParams={{ ...register("contactEmail"), required: true }}
          errors={errors.contactEmail}
          label={t("email")}
        />
        <PhoneNumberInput
          inputParams={{ ...register("phoneNumber"), required: true }}
          errors={errors.phoneNumber}
          label={t("phoneNumber")}
          formControl={control}
        />
        <CheckboxInput
          inputParams={{ ...register("published") }}
          errors={errors.published}
          label={ts("published")}
        />
        <button
          className="btn-primary w-10/12"
          onClick={handleCreateOrUpdateBusiness}
          disabled={!isValid}
          type="button"
        >
          {t("submit")}
        </button>
      </form>
    </div>
  );
}
