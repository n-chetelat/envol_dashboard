import prisma from "@/libs/prisma";
import { auth } from "@clerk/nextjs/server";

export async function GET(request: Request) {
  const { userId } = auth();

  if (!userId) {
    return Response.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const profile = await prisma.profile.findFirst({
      where: { userId },
      include: {
        student: true,
        instructor: true,
        business: true,
      },
    });

    if (!profile) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    return Response.json(profile);
  } catch (error) {
    console.error("Error fetching profile:", error);
    return Response.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  const profileData = await request.json();
  let profile;

  // Ensure no profile already exists for this user
  profile = await prisma.profile.findFirst({
    where: { userId: profileData.userId },
  });
  if (profile) {
    return Response.json(
      { error: "A profile already exists for this user." },
      { status: 400 },
    );
  }

  try {
    profile = await prisma.profile.create({
      data: profileData,
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
