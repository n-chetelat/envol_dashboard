"use client";

import { useMemo, useEffect } from "react";
import { useForm, FieldError } from "react-hook-form";
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
import Button from "@/components/forms/Button";
import { showSuccessToast, showErrorToast } from "@/libs/toast";
import { isFieldRequired } from "@/libs/validation";
import { useProfile } from "@/store/ProfileProvider";
import { translateError } from "@/libs/utils";
import { updateProfile } from "@/queries/profile";
import { useUser } from "@clerk/nextjs";

export default function ProfileForm() {
  const { user } = useUser();
  const t = useTranslations();
  const te = (keyErrors: FieldError | undefined) =>
    translateError(t, keyErrors);
  const isRequired = (fieldName: string) =>
    isFieldRequired(ProfileFormSchema, fieldName);
  const [profile, setProfile] = useProfile()((state) => [
    state.profile,
    state.setProfile,
  ]);
  const {
    register,
    formState: { errors, isValid, isSubmitting },
    control,
    handleSubmit,
    setValue,
  } = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(ProfileFormSchema),
    mode: "onChange",
    defaultValues: profile
      ? {
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          preferredName: profile.preferredName || "",
          pronouns: profile.pronouns || [],
          email: user?.primaryEmailAddress?.emailAddress || "",
          phoneNumber: profile.phoneNumber || "",
        }
      : {},
  });

  const pronounSelectorOptions = useMemo(() => {
    return PRONOUNS.map((pronoun) => ({
      value: pronoun,
      label: t(`common.pronouns.${pronoun}`),
    }));
  }, [t]);

  useEffect(() => {
    setValue("email", user?.primaryEmailAddress?.emailAddress || "");
  }, [user]);

  const handleSubmitProfile = async (formData: ProfileFormSchemaType) => {
    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      preferredName: formData.preferredName,
      pronouns: formData.pronouns,
      email: formData.email,
      phoneNumber: formData.phoneNumber,
    };

    try {
      let response;
      if (profile?.id) {
        const { email: _, ...rest } = profileData;
        response = await updateProfile(profile.id, rest);
        if (response) {
          setProfile(response);
          showSuccessToast(t("success.saved"));
        }
      }
      if (!profile?.id || !response) {
        throw new Error("Failed to save profile: No Profile ID was given");
      }
    } catch (error) {
      showErrorToast(t("errors.failedToSave"));
      console.log(error);
    }
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
      <Button isValid={isValid} isSubmitting={isSubmitting} className="w-3/6">
        {t("common.submit")}
      </Button>
    </form>
  );
}
