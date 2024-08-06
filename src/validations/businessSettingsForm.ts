import { z, ZodType } from "zod";
import { Prisma } from "@prisma/client";
import { isPossiblePhoneNumber } from "react-phone-number-input";

export const BusinessSettingsFormSchema: ZodType<Prisma.BusinessCreateInput> =
  z.object({
    name: z.string().min(1, { message: "Name is required" }).trim(),
    bio: z.string().trim(),
    contactEmail: z.string().email("Enter a valid email"),
    phoneNumber: z.string().refine((val) => val && isPossiblePhoneNumber(val), {
      message: "Enter a valid email",
    }),
    published: z.boolean(),
  });
