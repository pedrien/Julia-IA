import { z } from "zod";

/**
 * Schema for ending a meeting with audio file
 */
export const endMeetingSchema = z.object({
  id_meeting: z.string(),
  audio_file: z
    .instanceof(File)
    .refine((file) => file.size > 0)
    .refine(
      (file) => file.size <= 50 * 1024 * 1024 // 50MB
    )
    .refine(
      (file) => file.type.startsWith("audio/"),
      "Le fichier doit être un fichier audio"
    ),
});

/**
 * TypeScript types inferred from schemas
 */
export type EndMeetingSchema = z.infer<typeof endMeetingSchema>;
