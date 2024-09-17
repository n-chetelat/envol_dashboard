import { z } from "zod";

export const EmailFormSchema = z
  .object({
    primaryEmail: z.string().email("invalidEmail"),
    secondaryEmail: z.string().email("invalidEmail"),
    verificationCode: z.string().optional(),
  })
  .refine((data) => {
    if (data.verificationCode && !data.secondaryEmail) {
      return { message: "Required" };
    }
    return true;
  });

export type EmailFormSchemaType = z.infer<typeof EmailFormSchema>;
