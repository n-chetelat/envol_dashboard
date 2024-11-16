import prisma from "@/libs/prisma";
import { auth } from "@clerk/nextjs/server";

export async function POST(request: Request) {
  const profileData = await request.json();
  const { userId } = auth();
  let profile;

  try {
    // Ensure no profile already exists for this user
    profile = await prisma.profile.findFirst({
      where: { userId: userId || "" },
    });
    if (profile) {
      return Response.json(
        { error: "A profile already exists for this user." },
        { status: 400 },
      );
    }

    profile = await prisma.profile.create({
      data: { ...profileData, userId },
    });
    return Response.json(profile);
  } catch (error) {
    let statusCode;
    if ((error as Error).name === "PrismaClientValidationError")
      statusCode = 400;
    else statusCode = 500;
    return Response.json({ error }, { status: statusCode });
  }
}
