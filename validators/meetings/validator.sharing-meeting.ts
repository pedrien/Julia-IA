import { z } from "zod";

/**
 * Schema pour le partage d'une réunion
 */
export const sharingMeetingParticipantSchema = z.object({
  meeting_id: z.string(),
  external_participant: z.array(z.string()),
  internal_participant: z.array(z.string()),
});

export type SharingMeetingParticipant = z.infer<
  typeof sharingMeetingParticipantSchema
>;
