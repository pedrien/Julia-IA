import { z } from "zod";
import { ENUM_TYPE_USER_CHAT } from "@/types/enums/chat/enum.type-user-chat";

export const chatMeetingSchema = z.object({
  id: z.string(),
  type: ENUM_TYPE_USER_CHAT,
  message: z.string(),
  date_time: z.string().regex(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/, {
    message: "date_time must be in YYYY-MM-DD HH:MM:SS format",
  }),
});

export type ChatMeetingSchema = z.infer<typeof chatMeetingSchema>;
export const listChatMeetingSchema = z.object({
  data: z.array(chatMeetingSchema),
});

export type ListChatMeetingSchema = z.infer<typeof listChatMeetingSchema>;
