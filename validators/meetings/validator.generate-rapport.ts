import { z } from "zod";

/**
 * Schema de validation pour générer un rapport
 */
export const generateRapportSchema = z.object({
  id: z.string().min(1, "L'ID de la réunion est requis"),
});

export type GenerateRapportSchema = z.infer<typeof generateRapportSchema>;
