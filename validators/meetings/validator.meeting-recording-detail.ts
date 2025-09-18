import { z } from "zod";
import { ENUM_PARTICIPANT_TYPE } from "@/types/enums/participants/enum.type-participants";

/**
 * Schema pour un participant (basé sur validator.list-participants.ts)
 */
export const meetingParticipantSchema = z.object({
  id: z.string(),
  name: z.string(),
  type: ENUM_PARTICIPANT_TYPE,
});

/**
 * Schema pour les détails d'une réunion (basé sur validator.create-meeting.ts)
 */
export const meetingDetailSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string(),
  scheduled_start_time: z.string(),
  location: z.string(),
  participants: z.array(meetingParticipantSchema),
});

/**
 * Schema pour la réponse complète des détails de réunion
 */
export const meetingRecordingDetailSchema = z.object({
  data: meetingDetailSchema,
});

/**
 * Types TypeScript inférés des schémas
 */
export type MeetingParticipant = z.infer<typeof meetingParticipantSchema>;
export type MeetingDetail = z.infer<typeof meetingDetailSchema>;
export type MeetingRecordingDetail = z.infer<
  typeof meetingRecordingDetailSchema
>;
