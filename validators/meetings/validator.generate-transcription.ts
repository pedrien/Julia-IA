import { z } from "zod";

/**
 * Schema de validation pour générer une transcription
 */
export const generateTranscriptionSchema = z.object({
  id: z.string().min(1, "L'ID de la réunion est requis"),
});

export type GenerateTranscriptionSchema = z.infer<
  typeof generateTranscriptionSchema
>;
