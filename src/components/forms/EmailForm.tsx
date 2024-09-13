"use client";

import { useEffect } from "react";
import { useForm, FieldError } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useUser } from "@clerk/nextjs";
import TextInput from "@/components/forms/TextInput";
import Button from "@/components/forms/Button";
import { showSuccessToast, showErrorToast } from "@/libs/toast";
import { translateError } from "@/libs/utils";
import { EmailFormSchema, EmailFormSchemaType } from "@/validations/emailForm";
import { addSecondaryEmail } from "@/queries/user";

export default function EmailForm() {
  const { user } = useUser();
  const t = useTranslations();
  const te = (keyErrors: FieldError | undefined) =>
    translateError(t, keyErrors);

  const {
    register,
    formState: { errors, isValid, isSubmitting },
    handleSubmit,
    setValue,
  } = useForm<EmailFormSchemaType>({
    resolver: zodResolver(EmailFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      setValue("primaryEmail", user.primaryEmailAddress?.emailAddress || "");
    }
  }, [user, setValue]);

  const handleSubmitEmail = async (formData: EmailFormSchemaType) => {
    try {
      await addSecondaryEmail(formData.secondaryEmail);
      showSuccessToast(t("success.saved"));
    } catch (error) {
      showErrorToast(t("errors.failedToUpdate"));
      console.log(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(handleSubmitEmail)}
      className="flex flex-col items-center"
    >
      <TextInput
        inputParams={{
          ...register("primaryEmail"),
          disabled: true,
        }}
        errors={te(errors.primaryEmail)}
        label={t("profile.primaryEmail")}
        required={true}
      />
      <TextInput
        inputParams={register("secondaryEmail")}
        errors={te(errors.secondaryEmail)}
        label={t("profile.secondaryEmail")}
        required={true}
      />
      <Button isValid={isValid} isSubmitting={isSubmitting} className="w-3/6">
        {t("common.submit")}
      </Button>
    </form>
  );
}
