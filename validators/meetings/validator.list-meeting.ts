import { ENUM_MEETING_STATUS } from "@/types/enums/meetings/enum.meeting-status";
import { z } from "zod";

export const meetingSchema = z.object({
  id: z.string(),
  title: z.string(),
  total_participants: z.number(),
  date_meeting: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, {
    message: "date_meeting must be in YYYY-MM-DD format",
  }),
  duration: z.number(),
  status: ENUM_MEETING_STATUS,
});

export type meetingSchema = z.infer<typeof meetingSchema>;

export const listMeetingSchema = z.object({
  data: z.array(meetingSchema),
});

export type ListMeetings = z.infer<typeof listMeetingSchema>;
