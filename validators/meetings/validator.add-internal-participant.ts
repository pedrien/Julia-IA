import { z } from "zod";

export const addInternalParticipantSchema = z.object({
  meetingId: z.string(),
  participantIds: z
    .array(z.string())
    .min(1, "Au moins un participant interne est requis"),
});

export type AddInternalParticipantSchema = z.infer<
  typeof addInternalParticipantSchema
>;
