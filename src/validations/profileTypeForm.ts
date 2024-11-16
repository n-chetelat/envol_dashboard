import { z } from "zod";
import { PROFILE_TYPES } from "@/libs/constants";

export const ProfileTypeFormSchema = z
  .object({
    profileType: z.string().refine((val) => val && val.length > 0),
    token: z.string().optional(),
    tokenIsValid: z
      .boolean()
      .optional()
      .refine((val) => !!val, {
        message: "invalidToken",
      }),
  })
  .refine(
    (schema) => {
      if (schema.profileType === PROFILE_TYPES.STUDENT_TYPE) return true;
      if (schema.tokenIsValid === undefined || !schema.profileType) return true;
      return (
        [PROFILE_TYPES.INSTRUCTOR_TYPE, PROFILE_TYPES.BUSINESS_TYPE].includes(
          schema.profileType,
        ) && schema.tokenIsValid
      );
    },
    { message: "invalidToken", path: ["token"] },
  );

export type ProfileTypeFormType = z.infer<typeof ProfileTypeFormSchema>;
