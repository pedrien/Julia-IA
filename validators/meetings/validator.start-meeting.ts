import { z } from "zod";

/**
 * Schema for starting a meeting
 */
export const startMeetingSchema = z.object({
  id_meeting: z.uuid("L'ID de la réunion doit être un UUID valide"),
});

/**
 * TypeScript types inferred from schemas
 */
export type StartMeetingSchema = z.infer<typeof startMeetingSchema>;
