import { Prisma } from "@prisma/client";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

export {
  type Profile,
  type ProfileType,
  type Business,
  type Instructor,
  type Student,
  type CourseListing,
} from "@prisma/client";

// Prisma

export type ProfileWithProfileTypes = Prisma.ProfileGetPayload<{
  include: {
    business: true;
    instructor: true;
    student: true;
  };
}>;

export type BusinessWithStripeAccount = Prisma.BusinessGetPayload<{
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
