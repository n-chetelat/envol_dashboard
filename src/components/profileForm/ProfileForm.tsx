"use client";

import { useMemo } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { createProfile } from "@/actions/profile";
import { Prisma } from "@prisma/client";
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
    <div className="flex">
      <form
        action={handleSubmit(handleCreateProfile)}
        className="flex flex-col"
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
          inputParams={{ ...register("pronouns") }}
          errors={errors.pronouns}
          label={t("pronoun")}
          options={pronounSelectorOptions}
          formControl={control}
          controllerComponent={Controller}
        />
        <PhoneNumberInput
          inputParams={{ ...register("phoneNumber"), required: true }}
          errors={errors.phoneNumber}
          label={t("phoneNumber")}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

type ProfileFormProps = {
  userId: string;
};
