"use client";

import { useMemo } from "react";
import { FieldError, useForm } from "react-hook-form";
import { useTranslations } from "next-intl";
import { updateProfile } from "@/actions/profile";
import { zodResolver } from "@hookform/resolvers/zod";
import { PRONOUNS } from "@/libs/constants";
import { showErrorToast, showSuccessToast } from "@/libs/toast";
import { translateError } from "@/libs/utils";
import { isFieldRequired } from "@/libs/validation";
import { useProfile } from "@/store/ProfileProvider";
import {
  ProfileFormSchema,
  ProfileFormSchemaType,
} from "@/validations/profileForm";
import Button from "@/components/buttons/Button";
import MultiSelectInput from "@/components/forms/components/MultiSelectInput";
import PhoneNumberInput from "@/components/forms/components/PhoneNumberInput";
import TextInput from "@/components/forms/components/TextInput";

export default function ProfileForm() {
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
    formState: { isValid, isSubmitting },
    control,
    handleSubmit,
  } = useForm<ProfileFormSchemaType>({
    resolver: zodResolver(ProfileFormSchema),
    mode: "onChange",
    defaultValues: profile
      ? {
          firstName: profile.firstName || "",
          lastName: profile.lastName || "",
          preferredName: profile.preferredName || "",
          pronouns: profile.pronouns || [],
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

  const handleSubmitProfile = async (formData: ProfileFormSchemaType) => {
    const profileData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      preferredName: formData.preferredName,
      pronouns: formData.pronouns,
      phoneNumber: formData.phoneNumber,
    };

    try {
      let response;
      if (profile?.id) {
        response = await updateProfile(profile.id, profileData);
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
        name="phoneNumber"
        label={t("common.phoneNumber")}
        control={control}
        required={isRequired("phoneNumber")}
      />
      <Button isValid={isValid} isSubmitting={isSubmitting} className="w-3/6">
        {t("common.submit")}
      </Button>
    </form>
  );
}
