import { z } from "zod";
import { ENUM_PARTICIPANT_TYPE } from "@/types/enums/participants/enum.type-participants";

/**
 * Schema for an individual participant
 */
export const participantSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: ENUM_PARTICIPANT_TYPE,
});

/**
 * Schema for the list of participants
 */
export const listParticipantsSchema = z.object({
  data: z
    .array(participantSchema)
    .min(1, "At least one participant is required"),
});

/**
 * Inferred TypeScript types
 */
export type Participant = z.infer<typeof participantSchema>;
export type ListParticipants = z.infer<typeof listParticipantsSchema>;
