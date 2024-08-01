"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Prisma } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createProfileTypeFormSchema,
  type ProfileTypeFormInput,
} from "@/validations/profileTypeForm";
import { StepComponentProps } from "@/components/stepper/Stepper";
import { useTranslations } from "next-intl";
import TextInput from "@/components/forms/TextInput";
import { verifyToken } from "@/libs/tokens";

export default function ProfileTypeForm({
  userEmail,
  data,
  onValidityChange,
  onDataChange,
}: StepComponentProps & ProfileTypeFormProps) {
  const t = useTranslations();
  const ProfileTypeFormSchema = createProfileTypeFormSchema(t);
  const {
    trigger,
    register,
    formState: { errors, isValid },
    watch,
    setValue,
    getValues,
  } = useForm<ProfileTypeFormInput>({
    resolver: zodResolver(ProfileTypeFormSchema),
    mode: "onChange",
    defaultValues: data, // Set default values from the passed data
  });
  const [isValidating, setIsValidating] = useState<boolean>(false);

  // Register a value for token validation without making an input field for it
  useEffect(() => {
    register("tokenIsValid");
  }, [register]);

  // Update form values when data prop changes
  useEffect(() => {
    Object.entries(data).forEach(([key, value]) => {
      setValue(key as keyof ProfileTypeFormInput, value as any);
    });
  }, [data, setValue]);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  useEffect(() => {
    const subscription = watch((value) => onDataChange(value));
    return () => subscription.unsubscribe();
  }, [watch, onDataChange]);

  const onTokenSubmit = async () => {
    setIsValidating(true);
    const { profileType, token } = getValues();
    try {
      await verifyTokenForProfileType(token || "", profileType);
      setValue("tokenIsValid", true);
      trigger();
    } catch (error) {
      console.error(error);
      setValue("tokenIsValid", false);
      trigger();
    } finally {
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
        <div className="mt-4">
          <input
            {...register("profileType")}
            type="radio"
            value="student"
            disabled={isValid || isValidating}
          />
          <label>{` ${t("profile.amStudent")}`}</label>
        </div>
        <div className="mt-4">
          <input
            {...register("profileType")}
            type="radio"
            value="instructor"
            disabled={isValid || isValidating}
          />
          <label>{` ${t("profile.amInstructor")}`}</label>
        </div>
        <div className="mt-4">
          <input
            {...register("profileType")}
            type="radio"
            value="business"
            disabled={isValid || isValidating}
          />
          <label>{` ${t("profile.amBusiness")}`}</label>
        </div>
        <p className="h-8 text-vermillion">
          {errors.profileType && errors.profileType?.message}
        </p>

        {["instructor", "business"].includes(getValues("profileType")) && (
          <div className="m-2">
            <TextInput
              inputParams={{
                ...register("token"),
                required: true,
              }}
              errors={errors.token}
              label={t("profile.token")}
            />
            <button
              type="button"
              className="btn-primary"
              onClick={onTokenSubmit}
              disabled={isValid || isValidating}
            >
              {t("common.validate")}
            </button>
          </div>
        )}
      </form>
    </div>
  );
}

type ProfileTypeFormProps = {
  userEmail: string;
  data: Partial<Prisma.ProfileCreateInput>;
};
