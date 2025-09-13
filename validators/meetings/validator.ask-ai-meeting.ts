import { z } from "zod";

export const askAiMeetingSchema = z.object({
  meetingId: z.string(),
  message: z.string(),
});

export type AskAiMeetingSchema = z.infer<typeof askAiMeetingSchema>;
