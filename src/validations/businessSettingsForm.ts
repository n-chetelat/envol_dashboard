import { z } from "zod";
import { isPossiblePhoneNumber } from "react-phone-number-input";

export const BusinessSettingsFormSchema = z.object({
  name: z
    .string()
    .min(1, {
      message: "Required",
    })
    .trim(),
  bio: z
    .string()
    .min(1, {
      message: "Required",
    })
    .trim(),
  contactEmail: z.string().email("invalidEmail"),
  phoneNumber: z
    .string()
    .refine((val) => val && isPossiblePhoneNumber(val), "invalidPhone"),
  published: z.boolean(),
});

export type BusinessSettingsFormSchemaType = z.infer<
  typeof BusinessSettingsFormSchema
>;
