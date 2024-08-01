import { z, ZodType } from "zod";
import { PROFILE_TYPES } from "@/constants";

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
        if (schema.profileType === PROFILE_TYPES.STUDENT_TYPE) return true;
        if (schema.tokenIsValid === undefined || !schema.profileType)
          return true;
        return (
          [PROFILE_TYPES.INSTRUCTOR_TYPE, PROFILE_TYPES.BUSINESS_TYPE].includes(
            schema.profileType,
          ) && schema.tokenIsValid
        );
      },
      { message: translations("errors.invalidToken"), path: ["token"] },
    );
  return ProfileTypeFormSchema;
};
