import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  const { token, email } = await request.json();
  const now = new Date().toISOString(); // ISO string is in UTC for timezone safety
  const instructorToken = await prisma.instructorToken.findFirst({
    where: {
      token,
      email,
      used: false,
      expiresAt: {
        gt: now,
      },
    },
  });

  if (!instructorToken) {
    return Response.json(
      { error: `Invalid Instructor Token ${token}` },
      { status: 400 },
    );
  }

  if (instructorToken.used) {
    return Response.json(
      { error: `Token ${token} has already been used` },
      { status: 400 },
    );
  }

  await prisma.instructorToken.update({
    where: { id: instructorToken.id },
    data: { used: true },
  });

  return Response.json({
    valid: true,
  });
}
