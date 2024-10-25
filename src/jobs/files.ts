import { inngest } from "@/libs/inngest";

export const handleFileDelete = inngest.createFunction(
  { id: "file-delete-handler" },
  { event: "files/delete-file-from-storage" },
  async ({ event, step }) => {
    const response = await handleDeleteFile(event.data.url);
    return { event };
  },
);

async function handleDeleteFile(url: string) {
  const response = await fetch(`/api/files?url=${url}`, {
    method: "DELETE",
  });
  return response;
}
