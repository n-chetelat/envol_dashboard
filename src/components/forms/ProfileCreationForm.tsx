"use client";

import { useMemo, useEffect } from "react";
import { useForm, FieldError, Field } from "react-hook-form";
import { Prisma } from "@prisma/client";
import { PRONOUNS } from "@/libs/constants";
import { useTranslations } from "next-intl";
import TextInput from "@/components/forms/TextInput";
import PhoneNumberInput from "@/components/forms/PhoneNumberInput";
import MultiSelectInput from "@/components/forms/MultiSelectInput";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProfileFormSchema,
  ProfileFormSchemaType,
} from "@/validations/profileForm";
import { StepComponentProps } from "@/components/stepper/Stepper";
import { isFieldRequired } from "@/libs/validation";
import { translateError } from "@/libs/utils";
import { useUser } from "@clerk/nextjs";

type ProfileTypeFormProps = {
  data: Partial<Prisma.ProfileCreateInput>;
};

export default function ProfileCreationForm({
  data,
  onValidityChange,
  onDataChange,
}: StepComponentProps & ProfileTypeFormProps) {
  const { user } = useUser();
  const t = useTranslations();
  const te = (keyErrors: FieldError | undefined) =>
    translateError(t, keyErrors);
  const isRequired = (fieldName: string) =>
    isFieldRequired(ProfileFormSchema, fieldName);
  const {
    getFieldState,
    trigger,
    register,
    formState: { errors, isValid },
    control,
    watch,
    setValue,
  } = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(ProfileFormSchema),
    mode: "onChange",
    defaultValues: { ...data, email: user?.primaryEmailAddress?.emailAddress }, // Set default values from the passed data
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
          inputParams={register("firstName")}
          errors={te(errors.firstName)}
          label={t("common.firstName")}
          required={isRequired("firstName")}
        />
        <TextInput
          inputParams={register("lastName")}
          errors={te(errors.lastName)}
          label={t("common.lastName")}
          required={isRequired("lastName")}
        />
        <TextInput
          inputParams={register("preferredName")}
          errors={te(errors.preferredName)}
          label={t("common.preferredName")}
          required={isRequired("preferredName")}
        />
        <MultiSelectInput<string>
          inputParams={register("pronouns")}
          errors={te(errors.pronouns as FieldError)}
          label={t("common.pronoun")}
          options={pronounSelectorOptions}
          formControl={control}
          placeholder={t("common.select")}
          required={isRequired("pronouns")}
        />
        <PhoneNumberInput
          inputParams={register("phoneNumber")}
          errors={te(errors.phoneNumber)}
          label={t("common.phoneNumber")}
          formControl={control}
          required={isRequired("phoneNumber")}
        />
        <TextInput
          inputParams={{
            ...register("email"),
            disabled: true,
          }}
          errors={te(errors.email)}
          label={t("common.email")}
          required={isRequired("email")}
        />
      </form>
    </div>
  );
}
