import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  let instructor;

  // Ensure no instructor already exists for this profile
  instructor = await prisma.instructor.findFirst({
    where: { profileId: data.profileId },
  });
  if (instructor) {
    return Response.json(
      { error: "A instructor already exists for this profile." },
      { status: 400 },
    );
  }
  try {
    instructor = await prisma.instructor.create({
      data: { profile: { connect: { id: data.profileId } } },
    });
    return Response.json(instructor);
  } catch (error) {
    let statusCode;
    if (error.name === "PrismaClientValidationError") statusCode = 400;
    else statusCode = 500;
    return Response.json({ error }, { status: statusCode });
  }
}
