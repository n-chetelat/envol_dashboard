"use client";

import { useEffect, useState } from "react";
import { useForm, FieldError } from "react-hook-form";
import { Prisma } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProfileTypeFormSchema,
  type ProfileTypeFormType,
} from "@/validations/profileTypeForm";
import { StepComponentProps } from "@/components/stepper/Stepper";
import { useTranslations } from "next-intl";
import TextInput from "@/components/forms/TextInput";
import { verifyToken } from "@/libs/tokens";
import { PROFILE_TYPES } from "@/libs/constants";
import { Loader, CircleCheckBig } from "@/libs/icons";
import RadioInput from "@/components/forms/RadioInput";
import { isFieldRequired } from "@/libs/validation";
import { translateError } from "@/libs/utils";
import { useUser } from "@clerk/nextjs";

export default function ProfileTypeForm({
  data,
  onValidityChange,
  onDataChange,
}: StepComponentProps & ProfileTypeFormProps) {
  const t = useTranslations();
  const te = (keyErrors: FieldError | undefined) =>
    translateError(t, keyErrors);
  const {
    trigger,
    register,
    formState: { errors, isValid },
    watch,
    setValue,
    getValues,
  } = useForm<ProfileTypeFormType>({
    resolver: zodResolver(ProfileTypeFormSchema),
    mode: "onChange",
    defaultValues: data, // Set default values from the passed data
  });
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const { user } = useUser();
  const userEmail = user?.primaryEmailAddress?.emailAddress || "";

  // Register a value for token validation without making an input field for it
  useEffect(() => {
    register("tokenIsValid");
  }, [register]);

  // Update form values when data prop changes
  useEffect(() => {
    Object.entries(data).forEach(([key, value]) => {
      const currentValue = getValues(key as keyof ProfileTypeFormType);
      if (currentValue !== value) {
        // Update value for validation purposes
        setValue(key as keyof ProfileTypeFormType, value as any);
        // Update value for data tracking purposes
        data[key] = value;
      }
    });
  }, [data, setValue, getValues]);

  useEffect(() => {
    const values = getValues();
    const isFormValid =
      values.profileType === PROFILE_TYPES.STUDENT_TYPE ||
      values.tokenIsValid === true;
    onValidityChange(isFormValid);
  }, [watch, onValidityChange, getValues]);

  useEffect(() => {
    const subscription = watch((value: unknown) => onDataChange(value));
    return () => subscription.unsubscribe();
  }, [watch, onDataChange]);

  const onTokenSubmit = async () => {
    setIsValidating(true);
    const { profileType, token } = getValues();
    try {
      await verifyTokenForProfileType(token || "", profileType);
      setValue("tokenIsValid", true);
    } catch (error) {
      console.error(error);
      setValue("tokenIsValid", false);
    } finally {
      trigger();
      setIsValidating(false);
    }
  };

  const verifyTokenForProfileType = async (
    token: string,
    profileType: string,
  ) => {
    const result = await verifyToken(token, profileType, userEmail);

    if (!result?.ok) {
      if (result.status === 400) {
        throw new Error(`Invalid Token of Type ${profileType}`);
      } else {
        throw new Error(`Error processing profile creation token`);
      }
    }
  };

  return (
    <div className="paper m-4 flex flex-col">
      <h1 className="m-4 text-center font-bold uppercase lg:text-2xl">
        {t("profile.why")}
      </h1>
      <form className="flx w-full flex-col">
        <RadioInput
          inputParams={register("profileType")}
          errors={te(errors.profileType)}
          options={[
            {
              value: PROFILE_TYPES.STUDENT_TYPE,
              label: `${t("profile.amStudent")}`,
            },
            {
              value: PROFILE_TYPES.INSTRUCTOR_TYPE,
              label: `${t("profile.amInstructor")}`,
            },
            {
              value: PROFILE_TYPES.BUSINESS_TYPE,
              label: `${t("profile.amBusiness")}`,
            },
          ]}
          size="lg"
          disabled={isValid || isValidating}
          required={isFieldRequired(ProfileTypeFormSchema, "profileType")}
        />

        {[PROFILE_TYPES.INSTRUCTOR_TYPE, PROFILE_TYPES.BUSINESS_TYPE].includes(
          watch("profileType"),
        ) && (
          <div className="m-2 translate-y-4 animate-[fadeInUp_0.3s_ease-out_forwards] space-y-4 opacity-0 transition-all duration-300 ease-out">
            <TextInput
              inputParams={register("token")}
              errors={te(errors.token)}
              label={t("profile.token")}
              required={false}
            />
            <button
              type="button"
              className={`btn-primary flex items-center justify-center ${
                watch("tokenIsValid")
                  ? "bg-success disabled:cursor-not-allowed disabled:opacity-100 disabled:hover:bg-success"
                  : ""
              }`}
              onClick={onTokenSubmit}
              disabled={isValid || isValidating}
            >
              {isValidating ? (
                <Loader className="mr-2 h-4 w-4 animate-spin" />
              ) : watch("tokenIsValid") ? (
                <>
                  <CircleCheckBig className="mr-2 h-4 w-4" />
                </>
              ) : (
                ""
              )}
              {isValidating ? t("common.validating") : t("common.validated")}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

type ProfileTypeFormProps = {
  data: Partial<Prisma.ProfileCreateInput>;
};
