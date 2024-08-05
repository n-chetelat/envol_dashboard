import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  let student;

  // Ensure no student already exists for this profile
  student = await prisma.student.findFirst({
    where: { profileId: data.profileId },
  });
  if (student) {
    return Response.json(
      { error: "A student already exists for this profile." },
      { status: 400 },
    );
  }
  try {
    student = await prisma.student.create({
      data: { profile: { connect: { id: data.profileId } } },
    });
    return Response.json(student);
  } catch (error) {
    let statusCode;
    if (error.name === "PrismaClientValidationError") statusCode = 400;
    else statusCode = 500;
    return Response.json({ error }, { status: statusCode });
  }
}
