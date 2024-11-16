-- CreateEnum
CREATE TYPE "Language" AS ENUM ('EN', 'FR');

-- CreateEnum
CREATE TYPE "ProfileType" AS ENUM ('BUSINESS', 'INSTRUCTOR', 'STUDENT');

-- CreateEnum
CREATE TYPE "Frequency" AS ENUM ('ONCE', 'RECURRING');

-- CreateEnum
CREATE TYPE "Weekday" AS ENUM ('MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT', 'SUN');

-- CreateEnum
CREATE TYPE "WebhookEventStatus" AS ENUM ('DONE', 'FAILED', 'PENDING');

-- CreateTable
CREATE TABLE "Profile" (
    "id" UUID NOT NULL,
    "userId" VARCHAR(225) NOT NULL,
    "firstName" VARCHAR(225) NOT NULL,
    "lastName" VARCHAR(225) NOT NULL,
    "preferredName" VARCHAR(225),
    "pronouns" VARCHAR(30)[],
    "preferredLang" "Language" NOT NULL DEFAULT 'EN',
    "phoneNumber" VARCHAR(30) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "defaultDashboard" "ProfileType" NOT NULL DEFAULT 'STUDENT',

    CONSTRAINT "Profile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Business" (
    "id" UUID NOT NULL,
    "name" VARCHAR(50),
    "bio" TEXT,
    "phoneNumber" VARCHAR(30),
    "contactEmail" VARCHAR(30),
    "published" BOOLEAN NOT NULL DEFAULT false,
    "profileId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Business_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Instructor" (
    "id" UUID NOT NULL,
    "bio" TEXT,
    "profileId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Instructor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" UUID NOT NULL,
    "bio" TEXT,
    "profileId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BusinessToken" (
    "id" UUID NOT NULL,
    "token" VARCHAR(250) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "email" VARCHAR(50) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMPTZ(6) NOT NULL DEFAULT ((now() AT TIME ZONE 'UTC'::text) + '1 day'::interval),

    CONSTRAINT "BusinessToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "InstructorToken" (
    "id" UUID NOT NULL,
    "token" VARCHAR(250) NOT NULL,
    "used" BOOLEAN NOT NULL DEFAULT false,
    "email" VARCHAR(50) NOT NULL,
    "businessId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "expiresAt" TIMESTAMPTZ(6) NOT NULL DEFAULT ((now() AT TIME ZONE 'UTC'::text) + '1 day'::interval),

    CONSTRAINT "InstructorToken_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Course" (
    "id" UUID NOT NULL,
    "name" VARCHAR(225) NOT NULL,
    "description" TEXT NOT NULL,
    "requirements" TEXT NOT NULL,
    "businessId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Course_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseListing" (
    "id" UUID NOT NULL,
    "locationId" UUID NOT NULL,
    "courseId" UUID NOT NULL,
    "businessId" UUID NOT NULL,
    "timePeriodId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "CourseListing_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CourseSession" (
    "id" UUID NOT NULL,
    "courseListingId" UUID NOT NULL,
    "studentId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CourseSession_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Location" (
    "id" UUID NOT NULL,
    "name" VARCHAR(225) NOT NULL,
    "description" TEXT NOT NULL,
    "address" VARCHAR(225) NOT NULL,
    "businessId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Location_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TimePeriod" (
    "id" UUID NOT NULL,
    "frequency" "Frequency" NOT NULL,
    "weekdays" "Weekday"[],
    "time" TEXT NOT NULL,
    "date" TIMESTAMP(3),
    "start_date" TIMESTAMP(3),
    "end_date" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "TimePeriod_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeAccount" (
    "id" UUID NOT NULL,
    "stripeAccountId" TEXT NOT NULL,
    "chargesEnabled" BOOLEAN NOT NULL DEFAULT false,
    "payoutsEnabled" BOOLEAN NOT NULL DEFAULT false,
    "onboardingComplete" BOOLEAN NOT NULL DEFAULT false,
    "businessId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeAccount_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "StripeCustomer" (
    "id" UUID NOT NULL,
    "stripeCustomerId" TEXT NOT NULL,
    "profileId" UUID NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "StripeCustomer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "WebhookEvent" (
    "id" UUID NOT NULL,
    "data" JSONB NOT NULL,
    "source" VARCHAR(225) NOT NULL,
    "processingErrors" TEXT NOT NULL,
    "status" "WebhookEventStatus" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "WebhookEvent_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Profile_userId_key" ON "Profile"("userId");

-- CreateIndex
CREATE INDEX "Profile_userId_idx" ON "Profile"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "Business_profileId_key" ON "Business"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Instructor_profileId_key" ON "Instructor"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "Student_profileId_key" ON "Student"("profileId");

-- CreateIndex
CREATE UNIQUE INDEX "InstructorToken_businessId_key" ON "InstructorToken"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeAccount_stripeAccountId_key" ON "StripeAccount"("stripeAccountId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeAccount_businessId_key" ON "StripeAccount"("businessId");

-- CreateIndex
CREATE UNIQUE INDEX "StripeCustomer_profileId_key" ON "StripeCustomer"("profileId");

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Instructor" ADD CONSTRAINT "Instructor_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Student" ADD CONSTRAINT "Student_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InstructorToken" ADD CONSTRAINT "InstructorToken_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Course" ADD CONSTRAINT "Course_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseListing" ADD CONSTRAINT "CourseListing_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseListing" ADD CONSTRAINT "CourseListing_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseListing" ADD CONSTRAINT "CourseListing_locationId_fkey" FOREIGN KEY ("locationId") REFERENCES "Location"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseListing" ADD CONSTRAINT "CourseListing_timePeriodId_fkey" FOREIGN KEY ("timePeriodId") REFERENCES "TimePeriod"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSession" ADD CONSTRAINT "CourseSession_courseListingId_fkey" FOREIGN KEY ("courseListingId") REFERENCES "CourseListing"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CourseSession" ADD CONSTRAINT "CourseSession_studentId_fkey" FOREIGN KEY ("studentId") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Location" ADD CONSTRAINT "Location_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeAccount" ADD CONSTRAINT "StripeAccount_businessId_fkey" FOREIGN KEY ("businessId") REFERENCES "Business"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "StripeCustomer" ADD CONSTRAINT "StripeCustomer_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "Profile"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

