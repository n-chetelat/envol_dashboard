import { z, ZodType } from "zod";
import {Prisma} from "@prisma/client";

export const BusinessSettingsFormSchema: ZodType<Prisma.BusinessCreateInput> =
  z.object({
    name: z.string().min(1, { message: "Name is required" }).trim(),
    bio: z.string().trim(),
    phoneNumber: z.string().min(10, { message: "Use format 123-456-7890" }),
    contactEmail: z
      .string()
      .min(5, { message: "Enter a valid email " })
      .email("Enter a valid email"),
    published: z.boolean(),
  });
