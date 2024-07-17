import { z, ZodType } from "zod";
import { Prisma } from "@prisma/client";
import { LANGUAGES, PRONOUNS } from "@/constants";
import { isPossiblePhoneNumber } from "react-phone-number-input";

export const ProfileFormSchema: ZodType<Prisma.ProfileCreateInput> = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }).trim(),
  lastName: z.string().min(1, { message: "Last Name is required" }).trim(),
  preferredName: z.string().trim(),
  pronouns: z.array(z.string()),
  phoneNumber: z.string().refine((val) => val && isPossiblePhoneNumber(val), {
    message: "Invalid phone number",
  }),
});
