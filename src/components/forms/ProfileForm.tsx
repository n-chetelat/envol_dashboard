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
import { ProfileFormSchema } from "@/validations/profileForm";
import { StepComponentProps } from "@/components/stepper/Stepper";

export default function ProfileForm({
  userId,
  data,
  onValidityChange,
  onDataChange,
}: StepComponentProps & ProfileTypeFormProps) {
  const t = useTranslations("common");
  const tp = useTranslations("profile");

  const {
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
  }, [data, setValue]);

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
      label: t(`pronouns.${pronoun}`),
    }));
  }, []);

  return (
    <div className="paper m-4 flex flex-col">
      <h1 className="m-4 text-center text-2xl font-bold uppercase">
        {tp("title")}
      </h1>
      <h3 className="my-4 text-center">{tp("description")}</h3>
      <form className="flex flex-col items-center">
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
          placeholder={t("select")}
        />
        <PhoneNumberInput
          inputParams={{ ...register("phoneNumber"), required: true }}
          errors={errors.phoneNumber}
          label={t("phoneNumber")}
        />
      </form>
    </div>
  );
}

type ProfileTypeFormProps = {
  userId: string;
  data: Partial<Prisma.ProfileCreateInput>;
};
