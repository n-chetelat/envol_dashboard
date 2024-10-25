import { Prisma } from "@prisma/client";

export {
  type ProfileType,
  type Instructor,
  type Student,
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

export type CourseDescription = Prisma.CourseDescriptionGetPayload<{
  include: {
    courseDescriptionImages: {
      include: { image: true };
    };
  };
}>;

// Other

export interface FileType {
  id: string;
  url: string;
  name: string;
  type: string;
}

export type FileMetadata = {
  id?: string | undefined;
  url: string | undefined;
  name: string;
  type: string;
};

export type FileWithBlob = {
  fileId?: string;
  file: File;
  remoteUrl?: string;
};
