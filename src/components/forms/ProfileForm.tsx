"use client";

import { useMemo } from "react";
import { useForm } from "react-hook-form";
import { PRONOUNS } from "@/libs/constants";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProfileFormSchema,
  ProfileFormSchemaType,
} from "@/validations/profileForm";
import TextInput from "@/components/forms/TextInput";
import PhoneNumberInput from "@/components/forms/PhoneNumberInput";
import MultiSelectInput from "@/components/forms/MultiSelectInput";
import { isFieldRequired } from "@/libs/validation";
import { useDashboardContext } from "@/contexts/DashboardContext";
import { translateError } from "@/libs/utils";

export default function ProfileForm() {
  const t = useTranslations();
  const te = (keyErrors) => translateError(t, keyErrors);
  const isRequired = isFieldRequired.bind(ProfileFormSchema);
  const { profile } = useDashboardContext();
  const {
    register,
    formState: { errors, isValid },
    control,
    handleSubmit,
  } = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(ProfileFormSchema),
    mode: "onChange",
  });

  const pronounSelectorOptions = useMemo(() => {
    return PRONOUNS.map((pronoun) => ({
      value: pronoun,
      label: t(`common.pronouns.${pronoun}`),
    }));
  }, [t]);

  const handleSubmitProfile = async (formData: ProfileFormSchemaType) => {
    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      preferredName: formData.preferredName,
      pronouns: formData.pronouns,
      phoneNumber: formData.phoneNumber,
    };
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitProfile)}
      className="flex flex-col items-center"
    >
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
        errors={te(errors.pronouns)}
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
      <button className="btn-primary" disabled={!isValid} type="button">
        {t("common.submit")}
      </button>
    </form>
  );
}
