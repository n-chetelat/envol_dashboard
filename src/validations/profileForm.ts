import { z, ZodType } from "zod";
import { Prisma } from "@prisma/client";
import { LANGUAGES, PRONOUNS } from "@/constants";
import { isPossiblePhoneNumber } from "react-phone-number-input";

export const createProfileFormSchema = (translations) => {
  const ProfileFormSchema: ZodType<Prisma.ProfileCreateInput> = z.object({
    firstName: z
      .string()
      .min(1, {
        message: translations("errors.isRequired", {
          field: translations("common.firstName"),
        }),
      })
      .trim(),
    lastName: z
      .string()
      .min(1, {
        message: translations("errors.isRequired", {
          field: translations("common.lastName"),
        }),
      })
      .trim(),
    preferredName: z.string().trim(),
    pronouns: z
      .array(z.string())
      .nonempty({ message: translations("errors.selectOptions") }),
    phoneNumber: z.string().refine((val) => val && isPossiblePhoneNumber(val), {
      message: translations("errors.invalidPhone"),
    }),
  });
  return ProfileFormSchema;
};
