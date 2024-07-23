import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  const { token, email } = await request.json();
  const businessToken = await prisma.businessToken.findFirst({
    where: { token, email },
  });

  if (businessToken && !businessToken.used) {
    await prisma.businessToken.update({
      where: { id: businessToken.id },
      data: { used: true },
    });
    return Response.json({ valid: true });
  } else {
    return Response.json(
      { error: `Invalid Business Token ${token}` },
      { status: 400 },
    );
  }
}
