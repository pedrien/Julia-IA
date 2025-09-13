import { z } from "zod";

export const askAiMeetingSchema = z.object({
  meetingId: z.string(),
  id_last_message: z.string(),
  message: z.string(),
});

export type AskAiMeetingSchema = z.infer<typeof askAiMeetingSchema>;
