import { Prisma } from "@prisma/client";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

export {
  type ProfileType,
  type Instructor,
  type Student,
  type CourseDescription,
} from "@prisma/client";

// Prisma

export type Profile = Prisma.ProfileGetPayload<{
  include: {
    business: true;
    instructor: true;
    student: true;
  };
}>;

export type Business = Prisma.BusinessGetPayload<{
  include: {
    stripeAccount: true;
  };
}>;

// Forms

export type InputProps = {
  inputParams: UseFormRegisterReturn;
  errors: Partial<FieldError> | undefined;
  label: string;
  required: boolean;
};
