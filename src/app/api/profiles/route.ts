import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  const profileData = await request.json();
  const profile = await prisma.profile.create({
    data: profileData,
  });
  return Response.json(profile);
}
