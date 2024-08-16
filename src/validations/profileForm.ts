import { z, ZodType } from "zod";
import { Prisma } from "@prisma/client";
import { isPossiblePhoneNumber } from "react-phone-number-input";

export const createProfileFormSchema = (translations: Function) => {
  const schema: ZodType<Partial<Prisma.ProfileCreateInput>> = z.object({
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
    preferredName: z.string().trim().optional(),
    pronouns: z
      .array(z.string())
      .nonempty({ message: translations("errors.selectOptions") }),
    phoneNumber: z.string().refine((val) => val && isPossiblePhoneNumber(val), {
      message: translations("errors.invalidPhone"),
    }),
  });
  return schema;
};
