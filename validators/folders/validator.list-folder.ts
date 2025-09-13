import { z } from "zod";
import { ENUM_FOLDER_STATUS } from "@/types/enums/folders/enum.folder-status";

export const folderSchema = z.object({
  id: z.string(),
  status: ENUM_FOLDER_STATUS,
  name: z.string(),
  total_files: z.number(),
});

export type FolderSchema = z.infer<typeof folderSchema>;
export const listFolderSchema = z.object({
  data: z.array(folderSchema),
});

export type ListFolderSchema = z.infer<typeof listFolderSchema>;
