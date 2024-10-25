import { inngest } from "@/libs/inngest";

export const handleFileDelete = inngest.createFunction(
  { id: "file-delete-handler" },
  { event: "files/delete-file-from-storage" },
  async ({ event, step }) => {
    await handleDeleteFiles(event.data.url, event.user.token);
    return { event };
  },
);

async function handleDeleteFiles(urls: string[], token: string) {
  const response = await fetch(`${process.env["HOST"]}/api/files`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
    body: JSON.stringify({ urls }),
  });
  return response;
}
