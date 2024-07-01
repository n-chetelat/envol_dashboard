import prisma from "@/libs/prisma";

export async function GET(
  request: Request,
  { params }: { params: { id: string } },
) {
  const course = await prisma.course.findFirst({
    where: { id: `${params.id}` },
  });
  return Response.json(course);
}
