import prisma from "@/libs/prisma";

export async function POST(request: Request) {
  const data = await request.json();
  const instructor = await prisma.instructor.create({
    data: { profile: { connect: { id: data.id } } },
  });
  return Response.json(instructor);
}
