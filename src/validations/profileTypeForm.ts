import { z, ZodType } from "zod";
import prisma from "@prisma/client";

export type ProfileTypeFormInput = {
  profileType: string;
  token: string;
};

export const ProfileTypeFormSchema: ZodType<ProfileTypeFormInput> = z
  .object({
    profileType: z
      .string()
      .nullable()
      .refine((val) => val && val.length > 0, {
        message: "You must select one of the options",
      }),
    token: z.string().trim().optional(),
  })
  .refine(
    (schema) => {
      if (schema.profileType === "student") return true;
      return !(
        ["instructor", "business"].includes(schema.profileType) &&
        (!schema.token || schema.token.length < 10)
      );
    },
    { message: "Enter a valid token" },
  );
