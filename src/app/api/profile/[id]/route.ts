import prisma from "@/libs/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const data = await request.json();
    const profile = await prisma.profile.update({
      where: { id: params.id },
      data,
      include: {
        student: true,
        instructor: true,
        business: true,
      },
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
