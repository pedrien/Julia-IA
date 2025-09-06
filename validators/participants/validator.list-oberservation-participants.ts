import { z } from "zod";

export const oberservationParticpantMeetingSchema = z.object({
  id: z.string(),
  content: z.string(),
  date_time: z
    .string()
    .regex(
      /^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/,
      "Invalid date format, expected YYYY-MM-DD HH:MM:SS"
    ),
});
export type OberservationParticpantMeeting = z.infer<
  typeof oberservationParticpantMeetingSchema
>;
export const listOberservationParticipantsSchema = z.object({
  data: z.array(oberservationParticpantMeetingSchema),
});
export type ListOberservationParticipants = z.infer<
  typeof listOberservationParticipantsSchema
>;

export const getParticipantObservationsSchema = z.object({
  meetingId: z.string(),
  participantId: z.string(),
});
export type GetParticipantObservations = z.infer<
  typeof getParticipantObservationsSchema
>;
