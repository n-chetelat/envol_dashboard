"use client";

import { useMemo, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Prisma, Business } from "@prisma/client";
import { useTranslations } from "next-intl";
import TextInput from "@/components/forms/TextInput";
import PhoneNumberInput from "@/components/forms/PhoneNumberInput";
import CheckboxInput from "@/components/forms/CheckboxInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { BusinessSettingsFormSchema } from "@/validations/businessSettingsForm";
import { createBusiness, updateBusiness } from "@/actions/business";

export default function BusinessSettingsForm({
  profileId,
  business,
}: BusinessFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm<Prisma.BusinessCreateInput>({
    defaultValues: useMemo(() => {
      if (business) {
        return { ...business };
      } else return {};
    }, [
      business?.name,
      business?.bio,
      business?.contactEmail,
      business?.phoneNumber,
      business?.published,
    ]),
    resolver: zodResolver(BusinessSettingsFormSchema),
  });

  const t = useTranslations("common");
  const ts = useTranslations("settings");

  useEffect(() => {
    reset();
  }, [business]);

  const handleCreateOrUpdateBusiness = async (formData: FormData) => {
    const businessData = {
      name: `${formData.name}`,
      bio: `${formData.bio}`,
      contactEmail: `${formData.contactEmail}`,
      phoneNumber: `${formData.phoneNumber}`,
      published: formData.published,
    };

    try {
      if (business?.id) {
        await updateBusiness(business.id, businessData);
      } else {
        await updateBusiness(businessData);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="paper flex w-1/2 flex-col md:max-w-2xl">
      <h1 className="m-4 text-center text-2xl font-bold uppercase">
        {ts("businessTitle")}
      </h1>
      <form
        action={handleSubmit(handleCreateOrUpdateBusiness)}
        className="flex flex-col items-center"
      >
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
        />
        <CheckboxInput
          inputParams={{ ...register("published") }}
          errors={errors.published}
          label={ts("published")}
        />
        <button className="btn-primary w-10/12" type="submit">
          {t("submit")}
        </button>
      </form>
    </div>
  );
}

type BusinessFormProps = {
  profileId: string;
  business: Business;
};
