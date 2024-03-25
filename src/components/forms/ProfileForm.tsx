"use client";

import { useMemo } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { createProfile } from "@/actions/profile";
import prisma from "@prisma/client";
import { PRONOUNS } from "@/constants";
import { useTranslations } from "next-intl";
import TextInput from "@/components/forms/TextInput";
import PhoneNumberInput from "@/components/forms/PhoneNumberInput";
import MultiSelectInput from "@/components/forms/MultiSelectInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { ProfileFormSchema } from "@/validations/profileForm";

export default function ProfileForm({ userId }: ProfileFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm<Prisma.ProfileCreateInput>({
    resolver: zodResolver(ProfileFormSchema),
  });

  const t = useTranslations("common");
  const tp = useTranslations("profile");

  const handleCreateProfile = async (formData: FormData) => {
    try {
      const profileData: Prisma.ProfileCreateInput = {
        userId,
        firstName: `${formData.firstName}`,
        lastName: `${formData.lastName}`,
        preferredName: `${formData.preferredName}`,
        pronouns: formData.pronouns,
        phoneNumber: `${formData.phoneNumber}`,
      };
      await createProfile(profileData);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };
  const pronounSelectorOptions = useMemo(() => {
    return PRONOUNS.map((pronoun) => ({
      value: pronoun,
      label: t(`pronouns.${pronoun}`),
    }));
  }, []);

  return (
    <div className="paper m-4 flex w-1/2 flex-col md:max-w-2xl">
      <h1 className="m-4 text-center text-2xl font-bold uppercase">
        {tp("title")}
      </h1>
      <h3 className="my-4 text-center">{tp("description")}</h3>
      <form
        action={handleSubmit(handleCreateProfile)}
        className="flex flex-col items-center"
      >
        <TextInput
          inputParams={{ ...register("firstName"), required: true }}
          errors={errors.firstName}
          label={t("firstName")}
        />
        <TextInput
          inputParams={{ ...register("lastName"), required: true }}
          errors={errors.lastName}
          label={t("lastName")}
        />
        <TextInput
          inputParams={{ ...register("preferredName") }}
          errors={errors.preferredName}
          label={t("preferredName")}
        />
        <MultiSelectInput
          inputParams={{ ...register("pronouns"), required: true }}
          errors={errors.pronouns}
          label={t("pronoun")}
          options={pronounSelectorOptions}
          formControl={control}
          controllerComponent={Controller}
          placeholder={t("select")}
        />
        <PhoneNumberInput
          inputParams={{ ...register("phoneNumber"), required: true }}
          errors={errors.phoneNumber}
          label={t("phoneNumber")}
        />
        <button
          className="w-10/12 rounded bg-violet p-6 font-bold text-white hover:bg-violet-light"
          type="submit"
        >
          {t("submit")}
        </button>
      </form>
    </div>
  );
}

type ProfileFormProps = {
  userId: string;
};