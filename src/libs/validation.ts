import { z } from "zod";

type InferShape<T> = T extends z.ZodType<infer R> ? R : never;

export const isFieldRequired = <T extends z.ZodType<any>>(
  schema: T,
  fieldName: string,
): boolean => {
  if (!schema || !fieldName) return false;

  let fieldSchema: z.ZodTypeAny;

  if (schema instanceof z.ZodObject) {
    fieldSchema = schema.shape[fieldName];
  } else if (schema instanceof z.ZodEffects) {
    fieldSchema = schema._def.schema.shape[fieldName];
  } else {
    return false;
  }

  if (!fieldSchema) return false;
  if (fieldSchema.isOptional()) return false;

  if (fieldSchema instanceof z.ZodString || fieldSchema instanceof z.ZodArray) {
    return !fieldSchema.isOptional();
  }

  // For more refined cases, better to set manually on form field
  return false;
};
