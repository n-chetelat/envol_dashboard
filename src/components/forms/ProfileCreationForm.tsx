"use client";

import { useEffect, useMemo } from "react";
import { FieldError, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { Prisma } from "@prisma/client";
import { PRONOUNS } from "@/libs/constants";
import { translateError } from "@/libs/utils";
import { isFieldRequired } from "@/libs/validation";
import {
  ProfileFormSchema,
  ProfileFormSchemaType,
} from "@/validations/profileForm";
import MultiSelectInput from "@/components/forms/components/MultiSelectInput";
import PhoneNumberInput from "@/components/forms/components/PhoneNumberInput";
import TextInput from "@/components/forms/components/TextInput";
import { StepComponentProps } from "@/components/stepper/Stepper";

type ProfileTypeFormProps = {
  data: Partial<Prisma.ProfileCreateInput>;
};

export default function ProfileCreationForm({
  data,
  onValidityChange,
  onDataChange,
}: StepComponentProps & ProfileTypeFormProps) {
  const t = useTranslations();
  const te = (keyErrors: FieldError | undefined) =>
    translateError(t, keyErrors);
  const isRequired = (fieldName: string) =>
    isFieldRequired(ProfileFormSchema, fieldName);
  const {
    getFieldState,
    trigger,
    formState: { isValid },
    control,
    watch,
    setValue,
  } = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(ProfileFormSchema),
    mode: "onChange",
    defaultValues: data,
  });

  useEffect(() => {
    // Update form values when data prop changes
    Object.entries(data).forEach(([key, value]) => {
      setValue(key as keyof ProfileFormSchemaType, value as string);
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
          name="firstName"
          control={control}
          label={t("common.firstName")}
          required={isRequired("firstName")}
        />
        <TextInput
          name="lastName"
          control={control}
          label={t("common.lastName")}
          required={isRequired("lastName")}
        />
        <TextInput
          name="preferredName"
          control={control}
          label={t("common.preferredName")}
          required={isRequired("preferredName")}
        />
        <MultiSelectInput<string>
          name="pronouns"
          label={t("common.pronoun")}
          options={pronounSelectorOptions}
          control={control}
          placeholder={t("common.select")}
          required={isRequired("pronouns")}
        />
        <PhoneNumberInput
          control={control}
          name="phoneNumber"
          label={t("common.phoneNumber")}
          required={isRequired("phoneNumber")}
        />
      </form>
    </div>
  );
}
