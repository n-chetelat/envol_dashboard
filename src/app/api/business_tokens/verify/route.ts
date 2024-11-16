import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  const { token, email } = await request.json();
  const now = new Date().toISOString(); // ISO string is in UTC for timezone safety
  const businessToken = await prisma.businessToken.findFirst({
    where: {
      token,
      email,
      used: false,
      expiresAt: {
        gt: now,
      },
    },
  });

  if (!businessToken) {
    return Response.json(
      { error: `Invalid Business Token ${token}` },
      { status: 400 },
    );
  }

  if (businessToken.used) {
    return Response.json(
      { error: `Token ${token} has already been used` },
      { status: 400 },
    );
  }

  await prisma.businessToken.update({
    where: { id: businessToken.id },
    data: { used: true },
  });

  return Response.json({
    valid: true,
  });
}
