import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  const student = await prisma.student.create({
    data: { profile: { connect: { id: data.id } } },
  });
  return Response.json(student);
}
