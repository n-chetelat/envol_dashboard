"use client";

import { useMemo, useEffect } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { Prisma } from "@prisma/client";
import { PRONOUNS } from "@/constants";
import { useTranslations } from "next-intl";
import TextInput from "@/components/forms/TextInput";
import PhoneNumberInput from "@/components/forms/PhoneNumberInput";
import MultiSelectInput from "@/components/forms/MultiSelectInput";
import { zodResolver } from "@hookform/resolvers/zod";
import { createProfileFormSchema } from "@/validations/profileForm";
import { StepComponentProps } from "@/components/stepper/Stepper";
import { isFieldRequired } from "@/libs/validation";

export default function ProfileForm({
  data,
  onValidityChange,
  onDataChange,
}: StepComponentProps & ProfileTypeFormProps) {
  const t = useTranslations();
  const ProfileFormSchema = createProfileFormSchema(t);
  const {
    getFieldState,
    trigger,
    register,
    formState: { errors, isValid },
    control,
    watch,
    setValue,
  } = useForm<Prisma.ProfileCreateInput>({
    resolver: zodResolver(ProfileFormSchema),
    mode: "onChange",
    defaultValues: data, // Set default values from the passed data
  });

  useEffect(() => {
    // Update form values when data prop changes
    Object.entries(data).forEach(([key, value]) => {
      setValue(key as keyof Prisma.ProfileCreateInput, value);
    });
    // Validate contents of pronoun array as value is seemingly non-reactive
    if (getFieldState("pronouns").isDirty) {
      trigger("pronouns");
    }
  }, [data, setValue, trigger, getFieldState]);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  useEffect(() => {
    const subscription = watch((value) => onDataChange(value));
    return () => subscription.unsubscribe();
  }, [watch, onDataChange]);

  const pronounSelectorOptions = useMemo(() => {
    return PRONOUNS.map((pronoun) => ({
      value: pronoun,
      label: t(`common.pronouns.${pronoun}`),
    }));
  }, [t]);

  return (
    <div className="paper m-4 flex flex-col">
      <h1 className="m-4 text-center font-bold uppercase lg:text-2xl">
        {t("profile.title")}
      </h1>
      <h3 className="my-4 text-center">{t("profile.description")}</h3>
      <form className="flex flex-col items-center">
        <TextInput
          inputParams={register("firstName")}
          errors={errors.firstName}
          label={t("common.firstName")}
          required={isFieldRequired(ProfileFormSchema, "firstName")}
        />
        <TextInput
          inputParams={register("lastName")}
          errors={errors.lastName}
          label={t("common.lastName")}
          required={isFieldRequired(ProfileFormSchema, "lastName")}
        />
        <TextInput
          inputParams={register("preferredName")}
          errors={errors.preferredName}
          label={t("common.preferredName")}
          required={isFieldRequired(ProfileFormSchema, "preferredName")}
        />
        <MultiSelectInput<string>
          inputParams={register("pronouns")}
          errors={errors.pronouns}
          label={t("common.pronoun")}
          options={pronounSelectorOptions}
          formControl={control}
          placeholder={t("common.select")}
          required={isFieldRequired(ProfileFormSchema, "pronouns")}
        />
        <PhoneNumberInput
          inputParams={register("phoneNumber")}
          errors={errors.phoneNumber}
          label={t("common.phoneNumber")}
          formControl={control}
          required={isFieldRequired(ProfileFormSchema, "phoneNumber")}
        />
      </form>
    </div>
  );
}

type ProfileTypeFormProps = {
  data: Partial<Prisma.ProfileCreateInput>;
};
