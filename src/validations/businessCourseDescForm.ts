import { z } from "zod";
import {
  MAX_IMAGE_SIZE,
  ACCEPTED_IMAGE_TYPES,
  MAX_IMAGE_COUNT,
} from "@/libs/constants";

export const BusinessCourseDescFormSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  description: z.string().optional(),
  requirements: z.string().optional(),
  images: z
    .array(
      z
        .instanceof(File, { message: "mustBeFile" })
        .refine(
          (file) => file.size <= MAX_IMAGE_SIZE,
          `fileSize@size::${MAX_IMAGE_SIZE}`,
        )
        .refine(
          (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
          `formatsAccepted@formats::${ACCEPTED_IMAGE_TYPES.join(", ")}`,
        ),
    )
    .max(MAX_IMAGE_COUNT, `uploadMax@count::${MAX_IMAGE_COUNT}`)
    .optional(),
});

export type BusinessCourseDescFormSchemaType = z.infer<
  typeof BusinessCourseDescFormSchema
>;
