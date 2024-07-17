"use client";

import { useEffect, useState } from "react";
import { useForm, useFormContext } from "react-hook-form";
import { Prisma } from "@prisma/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  ProfileTypeFormSchema,
  type ProfileTypeFormInput,
} from "@/validations/profileTypeForm";
import { StepComponentProps } from "@/components/stepper/Stepper";
import { useTranslations } from "next-intl";
import TextInput from "@/components/forms/TextInput";

export default function ProfileTypeForm({
  userId,
  data,
  onValidityChange,
  onDataChange,
}: StepComponentProps & ProfileTypeFormProps) {
  const {
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

  const t = useTranslations("common");
  const tp = useTranslations("profile");

  useEffect(() => {
    // Update form values when data prop changes
    Object.entries(data).forEach(([key, value]) => {
      setValue(key as keyof ProfileTypeFormInput, value);
    });
  }, [data, setValue]);

  useEffect(() => {
    onValidityChange(isValid);
  }, [isValid, onValidityChange]);

  useEffect(() => {
    const subscription = watch((value) => onDataChange(value));
    return () => subscription.unsubscribe();
  }, [watch, onDataChange]);

  return (
    <div className="paper m-4 flex flex-col">
      <h1 className="m-4 text-center font-bold uppercase lg:text-2xl">
        {tp("why")}
      </h1>
      <form className="flx w-full flex-col">
        <div className="mt-4">
          <input {...register("profileType")} type="radio" value="student" />
          <label>{` ${tp("amStudent")}`}</label>
        </div>
        <div className="mt-4">
          <input {...register("profileType")} type="radio" value="instructor" />
          <label>{` ${tp("amInstructor")}`}</label>
        </div>
        <div className="mt-4">
          <input {...register("profileType")} type="radio" value="business" />
          <label>{` ${tp("amBusiness")}`}</label>
        </div>
        <p className="h-8 text-vermillion">
          {errors.profileType && errors.profileType?.message}
        </p>

        {["instructor", "business"].includes(getValues("profileType")) && (
          <div className="m-2">
            <TextInput
              inputParams={{ ...register("token"), required: true }}
              errors={errors.token}
              label={tp("token")}
            />
          </div>
        )}
      </form>
    </div>
  );
}

type ProfileTypeFormProps = {
  userId: string;
  data: Partial<Prisma.ProfileCreateInput>;
};
