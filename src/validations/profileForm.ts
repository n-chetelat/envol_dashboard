import { z } from "zod";
import { isPossiblePhoneNumber } from "react-phone-number-input";

export const ProfileFormSchema = z.object({
  firstName: z
    .string()
    .min(1, {
      message: "Required",
    })
    .trim(),
  lastName: z
    .string()
    .min(1, {
      message: "Required",
    })
    .trim(),
  preferredName: z.string().trim().optional(),
  pronouns: z.array(z.string()).nonempty({ message: "selectOptions" }),
  phoneNumber: z.string().refine((val) => val && isPossiblePhoneNumber(val), {
    message: "invalidPhone",
  }),
});

export type ProfileFormSchemaType = z.infer<typeof ProfileFormSchema>;
