import { PutBlobResult, del, put } from "@vercel/blob";

export const runtime = "edge";

export async function PUT(request: Request) {
  try {
    const form = await request.formData();
    const files = form.getAll("file[]") as File[];
    const promises: Promise<PutBlobResult>[] = [];
    files.forEach((file) => {
      promises.push(put(file.name, file, { access: "public" }));
    });
    const blobs = await Promise.all(promises);
    return Response.json(blobs);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  try {
    const { urls } = await request.json();
    const response = await del(urls);
    return Response.json(response);
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
