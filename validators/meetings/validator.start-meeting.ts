import { z } from "zod";

/**
 * Schema for starting a meeting
 */
export const startMeetingSchema = z.object({
  id_meeting: z.string(),
});

/**
 * TypeScript types inferred from schemas
 */
export type StartMeetingSchema = z.infer<typeof startMeetingSchema>;
