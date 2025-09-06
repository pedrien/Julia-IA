import { z } from "zod";

/**
 * Schema for creating a new meeting
 */
export const createMeetingSchema = z.object({
  title: z
    .string()
    .min(1, "Le titre est requis")
    .max(200, "Le titre ne peut pas dépasser 200 caractères"),
  description: z
    .string()
    .min(1, "La description est requise")
    .max(1000, "La description ne peut pas dépasser 1000 caractères"),
  scheduled_start_time: z
    .string()
    .min(1, "L'heure de début est requise")
    .regex(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
      "Le format de l'heure doit être YYYY-MM-DD HH:MM:SS"
    ),

  location: z
    .string()
    .min(1, "Le lieu est requis")
    .max(200, "Le lieu ne peut pas dépasser 200 caractères"),
  participants_interne: z
    .array(z.string())
    .min(1, "Au moins un participant interne est requis"),
  participants_externe: z.array(z.string()).default([]),
});

export const responseCreateMeetingSchema = z.object({
  data: z.object({
    id: z.string(),
  }),
});

/**
 * TypeScript types inferred from schemas
 */
export type CreateMeetingSchema = z.infer<typeof createMeetingSchema>;
export type ResponseCreateMeetingSchema = z.infer<
  typeof responseCreateMeetingSchema
>;
