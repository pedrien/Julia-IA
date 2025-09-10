import { z } from "zod";

export const markMeetingTraitedSchema = z.object({
  meetingId: z.string(),
});
export type MarkMeetingTraited = z.infer<typeof markMeetingTraitedSchema>;
