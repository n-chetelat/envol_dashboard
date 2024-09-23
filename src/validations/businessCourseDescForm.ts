import { z } from "zod";

export const BusinessCourseDescFormSchema = z.object({
  name: z.string().min(1, { message: "Required" }),
  description: z.string().optional(),
  requirements: z.string().optional(),
});

export type BusinessCourseDescFormSchemaType = z.infer<
  typeof BusinessCourseDescFormSchema
>;
