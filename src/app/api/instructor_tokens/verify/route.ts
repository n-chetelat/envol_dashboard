import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  const { token, email } = await request.json();
  const instructorToken = await prisma.instructorToken.findFirst({
    where: { token, email },
  });

  if (instructorToken && !instructorToken.used) {
    await prisma.instructorToken.update({
      where: { id: instructorToken.id },
      data: { used: true },
    });
    return Response.json({ valid: true });
  } else {
    return Response.json(
      { error: `Invalid Instructor Token ${token}` },
      { status: 400 },
    );
  }
}
