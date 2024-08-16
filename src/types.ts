import { Prisma } from "@prisma/client";
import { UseFormRegisterReturn, FieldError } from "react-hook-form";

export { type ProfileType } from "@prisma/client";

// Prisma

export type ProfileWithProfileTypes = Prisma.ProfileGetPayload<{
  include: {
    businesses: true;
    instructors: true;
    students: true;
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
  errors: FieldError | undefined;
  label: string;
  required: boolean;
};
