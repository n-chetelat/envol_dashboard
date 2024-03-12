"use client";

import TextInput from "@/components/forms/TextInput";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useTranslations } from "next-intl";
import { zodResolver } from "@hookform/resolvers/zod";
import { TokenFormSchema, type TokenFormInput } from "@/validations/tokenForm";

export default function TokenForm({ onSubmit }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TokenFormInput>({
    resolver: zodResolver(TokenFormSchema),
  });

  const t = useTranslations("common");
  const td = useTranslations("dashboard");
  return (
    <form action={handleSubmit(onSubmit)} className="flx w-full flex-col">
      <div className="mt-4">
        <input {...register("tokenType")} type="radio" value="instructor" />
        <label>{` ${td("amInstructor")}`}</label>
      </div>
      <div className="mt-4">
        <input {...register("tokenType")} type="radio" value="business" />
        <label>{` ${td("amBusiness")}`}</label>
      </div>
      <p className="h-8 text-pink-500">
        {errors.tokenType && errors.tokenType?.message}
      </p>
      <div className="m-2">
        <TextInput
          inputParams={{ ...register("token"), required: true }}
          errors={errors.token}
          label={td("token")}
        />
      </div>
      <div className="flex justify-center">
        <button
          type="submit"
          className="w-10/12 rounded bg-darkblue p-6 font-bold text-white hover:bg-darkblue-light"
        >
          {t("submit")}
        </button>
      </div>
    </form>
  );
}
