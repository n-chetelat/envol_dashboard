import { z, ZodType } from "zod";
import prisma from "@prisma/client";

export type TokenFormInput = {
  tokenType: string;
  toke: string;
};

export const TokenFormSchema: ZodType<TokenFormInput> = z.object({
  tokenType: z
    .string()
    .nullable()
    .refine((val) => val && val.length > 0, {
      message: "You must choose one of these options",
    }),
  token: z.string().min(10),
});
