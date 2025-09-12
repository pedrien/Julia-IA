import { z } from "zod";

export const infoFolderSchema = z.object({
  id: z.string(),
  nom_dossier: z.string(),
  description: z.string(),
});

export type InfoFolderSchema = z.infer<typeof infoFolderSchema>;
