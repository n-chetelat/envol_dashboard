import { z, ZodType } from "zod";

export type ProfileTypeFormInput = {
  profileType: string;
  token?: string;
  tokenIsValid?: boolean;
};

export const createProfileTypeFormSchema = (translations: Function) => {
  const ProfileTypeFormSchema: ZodType<ProfileTypeFormInput> = z
    .object({
      profileType: z.string().refine((val) => val && val.length > 0),
      token: z.string().optional(),
      tokenIsValid: z
        .boolean()
        .optional()
        .refine((val) => !!val, {
          message: translations("errors.invalidToken"),
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
      { message: translations("errors.invalidToken"), path: ["token"] },
    );
  return ProfileTypeFormSchema;
};
