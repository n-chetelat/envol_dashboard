import { inngest } from "@/libs/inngest";

export const handleFileDelete = inngest.createFunction(
  { id: "file-delete-handler" },
  { event: "files/delete-file-from-storage" },
  async ({ event, step }) => {
    await handleDeleteFile(event.data.url, event.user.token);
    return { event };
  },
);

async function handleDeleteFile(url: string, token: string) {
  const response = await fetch(`${process.env["HOST"]}/api/files?url=${url}`, {
    method: "DELETE",
    headers: { Authorization: `Bearer ${token}` },
  });
  return response;
}
