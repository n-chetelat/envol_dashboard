import { z, ZodType } from "zod";

export type ProfileTypeFormInput = {
  profileType: string;
  token?: string;
  tokenIsValid?: boolean;
};

export const ProfileTypeFormSchema: ZodType<ProfileTypeFormInput> = z
  .object({
    profileType: z.string().refine((val) => val && val.length > 0, {
      message: "You must select one of the options",
    }),
    token: z.string().optional(),
    tokenIsValid: z
      .boolean()
      .optional()
      .refine((val) => !!val, {
        message: "Your token must be valid",
      }),
  })
  .refine(
    (schema) => {
      if (schema.profileType === "student") return true;
      if (schema.tokenIsValid === undefined) return true;
      return (
        ["instructor", "business"].includes(schema.profileType || "") &&
        schema.tokenIsValid
      );
    },
    { message: "The token you have entered is not valid.", path: ["token"] },
  );
