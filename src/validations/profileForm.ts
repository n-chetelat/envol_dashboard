import { z, ZodType } from "zod";
import prisma from "@prisma/client";
import { LANGUAGES, PRONOUNS } from "@/constants";

export const ProfileFormSchema: ZodType<Prisma.ProfileCreateInput> = z.object({
  firstName: z.string().min(1, { message: "First Name is required" }).trim(),
  lastName: z.string().min(1, { message: "Last Name is required" }).trim(),
  preferredName: z.string().trim(),
  pronouns: z.array(z.string()),
  phoneNumber: z.string().min(12, { message: "Invalid phone number" }),
});
