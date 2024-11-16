import prisma from "@/libs/prisma";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } },
) {
  try {
    const data = await request.json();
    const business = await prisma.business.update({
      where: { id: params.id },
      data,
    });
    return Response.json(business);
  } catch (error) {
    let statusCode;
    if ((error as Error).name === "PrismaClientValidationError")
      statusCode = 400;
    else statusCode = 500;
    return Response.json({ error }, { status: statusCode });
  }
}
