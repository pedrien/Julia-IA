import { ENUM_MEETING_STATUS } from "@/types/enums/meetings/enum.meeting-status";
import { ENUM_PARTICIPANT_TYPE } from "@/types/enums/participants/enum.type-participants";
import { z } from "zod";

export const meetingParticipantSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string(),
  phone: z.string().nullable(),
  has_processed_report: z.boolean().optional(),
  has_read_report: z.boolean().optional(),
  processed_date: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
      "Invalid date format, expected YYYY-MM-DD HH:MM:SS"
    )
    .nullable()
    .optional(),
  read_date: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
      "Invalid date format, expected YYYY-MM-DD HH:MM:SS"
    )
    .nullable()
    .optional(),
  type: ENUM_PARTICIPANT_TYPE,
});
export type MeetingParticipant = z.infer<typeof meetingParticipantSchema>;

export const meetingParticipantListSchema = z.object({
  participants: z.array(meetingParticipantSchema),
  guest_participants: z.array(meetingParticipantSchema),
});
export type MeetingParticipantList = z.infer<
  typeof meetingParticipantListSchema
>;

export const meetingTranscriptTextSchema = z.object({
  text: z.string(),
});
export type MeetingTranscriptText = z.infer<typeof meetingTranscriptTextSchema>;

/**
 * Schema pour les détails d'une réunion
 */
export const detailMeetingSchema = z.object({
  id: z.string(),
  title: z.string(),
  total_participants: z.number(),
  date_meeting: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "date_meeting must be in YYYY-MM-DD format",
  }),
  duration: z.number(),
  status: ENUM_MEETING_STATUS,
});

export type DetailMeeting = z.infer<typeof detailMeetingSchema>;

export const meetingDocumentSchema = z.object({
  url_recording: z.string(),
  url_report: z.string(),
});
export type MeetingDocument = z.infer<typeof meetingDocumentSchema>;
