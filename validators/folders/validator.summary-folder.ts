import { z } from "zod";

export const summaryFolderSchema = z.object({
  summary: z.string(),
});

export type SummaryFolderSchema = z.infer<typeof summaryFolderSchema>;
