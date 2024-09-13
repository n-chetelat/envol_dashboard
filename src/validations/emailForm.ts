import { z } from "zod";

export const EmailFormSchema = z.object({
  primaryEmail: z.string().email("invalidEmail"),
  secondaryEmail: z.string().email("invalidEmail").min(1, "Required"),
});

export type EmailFormSchemaType = z.infer<typeof EmailFormSchema>;
