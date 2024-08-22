import { z } from "zod";
import { isPossiblePhoneNumber } from "react-phone-number-input";

export const createBusinessSettingsFormSchema = (translations: Function) => {
  return z.object({
    name: z
      .string()
      .min(1, {
        message: translations("errors.isRequired", {
          field: translations("common.name"),
        }),
      })
      .trim(),
    bio: z
      .string()
      .min(1, {
        message: translations("errors.isRequired", {
          field: translations("common.bio"),
        }),
      })
      .trim(),
    contactEmail: z.string().email(translations("errors.invalidEmail")),
    phoneNumber: z
      .string()
      .refine(
        (val) => val && isPossiblePhoneNumber(val),
        translations("errors.invalidPhone"),
      ),
    published: z.boolean(),
  });
};
