import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  let business;

  // Ensure no business already exists for this profile
  business = await prisma.business.findFirst({
    where: { profileId: data.profileId },
  });
  if (business) {
    return Response.json(
      { error: "A business already exists for this profile." },
      { status: 400 },
    );
  }

  try {
    business = await prisma.business.create({
      data: { profile: { connect: { id: data.profileId } } },
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
