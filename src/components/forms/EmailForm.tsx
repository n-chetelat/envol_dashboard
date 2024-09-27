"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useUser } from "@clerk/nextjs";
import TextInput from "@/components/forms/components/TextInput";
import Button from "@/components/forms/components/Button";
import { showSuccessToast, showErrorToast } from "@/libs/toast";
import { EmailFormSchema, EmailFormSchemaType } from "@/validations/emailForm";
import { EmailAddressResource } from "@clerk/types";

export default function EmailForm() {
  const { user } = useUser();
  const t = useTranslations();
  const [isVerifying, setIsVerifying] = useState(false);
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [newEmailAddress, setNewEmailAddress] = useState<
    EmailAddressResource | undefined
  >();

  const {
    formState: { isValid, isSubmitting },
    handleSubmit,
    setValue,
    control,
  } = useForm<EmailFormSchemaType>({
    resolver: zodResolver(EmailFormSchema),
    mode: "onChange",
  });

  useEffect(() => {
    if (user) {
      setValue("primaryEmail", user.primaryEmailAddress?.emailAddress || "");
      const existingSecondaryEmail = user.emailAddresses.find((a) => {
        if (a?.verification?.status) {
          return !["verified", "expired"].includes(a.verification.status);
        }
      });

      if (existingSecondaryEmail) {
        setNewEmailAddress(existingSecondaryEmail as EmailAddressResource);
        setValue("secondaryEmail", existingSecondaryEmail.emailAddress);
        setIsVerifying(true);
      }
    }
  }, [user, setValue]);

  const handleSubmitEmail = async (formData: EmailFormSchemaType) => {
    if (isVerifying) {
      await handleVerification(formData.verificationCode);
    } else {
      await createNewEmail(formData.secondaryEmail);
    }
  };

  const createNewEmail = async (email: string | undefined) => {
    if (!email) return;
    setIsVerifying(true);
    try {
      const result = await user?.createEmailAddress({
        email,
      });
      // Reload user to get updated User object
      await user?.reload();
      if (result) {
        setNewEmailAddress(result as EmailAddressResource);
      }

      result?.prepareVerification({ strategy: "email_code" });
      showSuccessToast(t("success.verificationEmailSent"));
      setValue("secondaryEmail", "");
    } catch (error) {
      showErrorToast(t("errors.failedToUpdate"));
      console.log(error);
      setIsVerifying(false);
    }
  };

  const handleVerification = async (code: string | undefined) => {
    if (!code || !newEmailAddress) {
      showErrorToast(t("errors.noEmailToVerify"));
      return;
    }

    try {
      const result = await newEmailAddress.attemptVerification({
        code,
      });

      if (result.verification.status === "verified") {
        await user?.update({ primaryEmailAddressId: newEmailAddress.id });
        showSuccessToast(t("success.saved"));
        setIsVerifying(false);
        setNewEmailAddress(undefined);
        setValue("verificationCode", undefined);
      } else {
        showErrorToast(t("errors.verificationFailed"));
      }
    } catch (error) {
      showErrorToast(t("errors.verificationFailed"));
      console.error(error);
    }
  };

  const handleCancelVerification = async () => {
    try {
      if (newEmailAddress) {
        await newEmailAddress.destroy();
      }
      setIsVerifying(false);
      setNewEmailAddress(undefined);
      setValue("secondaryEmail", "");
      setValue("verificationCode", undefined);
      showSuccessToast(t("success.verificationCancelled"));
    } catch (error) {
      showErrorToast(t("errors.wrong"));
      console.error(error);
    }
  };

  const handleSendVerificationEmail = async () => {
    if (newEmailAddress) {
      try {
        await newEmailAddress.prepareVerification({ strategy: "email_code" });
        showSuccessToast(t("success.verificationEmailSent"));
      } catch (error) {
        showErrorToast(t("errors.wrong"));
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(handleSubmitEmail)} className="flex flex-col">
      <TextInput
        disabled={true}
        name="primaryEmail"
        control={control}
        label={t("profile.primaryEmail")}
        required={false}
      />
      <div className="flex flex-col space-y-2 lg:flex-row lg:items-center lg:space-x-2 lg:space-y-0">
        <TextInput
          disabled={isVerifying}
          name="secondaryEmail"
          control={control}
          label={t("profile.secondaryEmail")}
          required={true}
        />
        <div className="flex flex-wrap gap-2 lg:flex-nowrap">
          {!isVerifying && (
            <Button
              type="submit"
              isValid={isValid}
              isSubmitting={isSubmitting}
              className="px-2 py-1 text-sm"
            >
              {t("common.submit")}
            </Button>
          )}
          {isVerifying && (
            <>
              <Button
                type="button"
                isSubmitting={false}
                onClick={() => setShowVerificationInput(true)}
                className="whitespace-nowrap px-2 py-1 text-sm"
              >
                {t("common.validate")}
              </Button>
              <Button
                type="button"
                isSubmitting={false}
                onClick={handleSendVerificationEmail}
                className="whitespace-nowrap px-2 py-1 text-sm"
              >
                {t("profile.resend")}
              </Button>
              <Button
                type="button"
                isSubmitting={false}
                onClick={handleCancelVerification}
                className="whitespace-nowrap px-2 py-1 text-sm"
              >
                {t("common.delete")}
              </Button>
            </>
          )}
        </div>
      </div>
      <div
        className={`transition-all duration-300 ease-in-out ${
          showVerificationInput ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        {isVerifying && (
          <div className="flex items-center space-x-2">
            <TextInput
              name="verificationCode"
              control={control}
              label={t("profile.verificationCode")}
              required={true}
            />
            <Button
              type="submit"
              isValid={isValid}
              isSubmitting={isSubmitting}
              className="whitespace-nowrap px-2 py-1 text-sm"
            >
              {t("common.validate")}
            </Button>
          </div>
        )}
      </div>
    </form>
  );
}
