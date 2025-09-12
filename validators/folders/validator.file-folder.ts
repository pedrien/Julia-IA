import { z } from "zod";

export const fileFolderSchema = z.object({
  file_url: z.string(),
});

export type FileFolderSchema = z.infer<typeof fileFolderSchema>;
