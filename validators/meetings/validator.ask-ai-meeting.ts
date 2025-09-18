import { ENUM_TYPE_USER_CHAT } from "@/types/enums/chat/enum.type-user-chat";
import { z } from "zod";

export const askAiMeetingSchema = z.object({
  meetingId: z.string(),
  id_last_message: z.string().nullable(),
  message: z.string(),
});

export type AskAiMeetingSchema = z.infer<typeof askAiMeetingSchema>;

export const responseAskAiMeetingSchema = z.object({
  data: z.object({
    id: z.string(),
    type: ENUM_TYPE_USER_CHAT,
    message: z.string(),
    date_time: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, {
      message: "date_time must be in format YYYY-MM-DD HH:MM:SS",
    }),
  }),
});

export type ResponseAskAiMeetingSchema = z.infer<
  typeof responseAskAiMeetingSchema
>;
