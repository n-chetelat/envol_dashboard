const SHE = "she/her";
const HE = "he/him";
const THEY = "they/them";
export const PRONOUNS = [SHE, HE, THEY];

const EN = "EN";
const FR = "FR";
export const LANGUAGES = [EN, FR];

const STUDENT_TYPE = "STUDENT";
const INSTRUCTOR_TYPE = "INSTRUCTOR";
const BUSINESS_TYPE = "BUSINESS";
export const PROFILE_TYPES = { STUDENT_TYPE, INSTRUCTOR_TYPE, BUSINESS_TYPE };

export const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB for Vercel blob storage
export const MAX_IMAGE_COUNT = 3;
export const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
