import { ENUM_PARTICIPANT_TYPE } from "@/types/enums/participants/enum.type-participants";
import { z } from "zod";

export const addGuestMeetingSchema = z.object({
  meetingId: z.string(),
  type: ENUM_PARTICIPANT_TYPE,
  external_name: z
    .string()
    .min(1, "Le nom externe est requis")
    .max(100, "Le nom ne peut pas dépasser 100 caractères"),
  external_email: z

    .email("L'email doit être valide")
    .max(255, "L'email ne peut pas dépasser 255 caractères"),
  external_phone: z
    .string()
    .min(1, "Le téléphone est requis")
    .max(20, "Le téléphone ne peut pas dépasser 20 caractères"),
  external_company: z.string().optional(),
});

export type AddGuestMeetingSchema = z.infer<typeof addGuestMeetingSchema>;
