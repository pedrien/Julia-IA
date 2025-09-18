import { z } from "zod";

/**
 * Enum pour le statut d'un meeting : EN_ATTENTE, EN_COURS, TRAITE, LU
 */
export const ENUM_MEETING_STATUS = z.enum([
  "SCHEDULED", // scheduled
  "IN_PROGRESS", // in progress
  "COMPLETED", // completed
  "CANCELLED", // cancelled
]);
export type ENUM_MEETING_STATUS = z.infer<typeof ENUM_MEETING_STATUS>;

/**
 * Enum pour le statut d'avis d'un participant sur le rapport : NON_LU, NON_TRAITE, LU, TRAITE
 * (pour correspondre à l'image fournie)
 */
export const ENUM_PARTICIPANT_REPORT_STATUS = z.enum([
  "NON_LU", // non lu
  "NON_TRAITE", // non traité
  "LU", // lu
  "TRAITE", // traité
]);
export type ENUM_PARTICIPANT_REPORT_STATUS = z.infer<
  typeof ENUM_PARTICIPANT_REPORT_STATUS
>;

/**
 * Texte d'aide pour le statut d'un meeting
 */
export const helpEnumMeetingStatus = (status: ENUM_MEETING_STATUS) => {
  switch (status) {
    case "SCHEDULED":
      return "En attente";
    case "IN_PROGRESS":
      return "En cours";
    case "COMPLETED":
      return "Traité";
    case "CANCELLED":
      return "Lu";
    default:
      return "Statut inconnu";
  }
};

/**
 * Texte d'aide pour le statut d'avis d'un participant sur le rapport
 * (pour correspondre à l'image fournie)
 */
export const helpEnumParticipantReportStatus = (
  status: ENUM_PARTICIPANT_REPORT_STATUS
) => {
  switch (status) {
    case "NON_LU":
      return "Non lu";
    case "NON_TRAITE":
      return "Non traité";
    case "LU":
      return "Lu";
    case "TRAITE":
      return "Traité";
    default:
      return "Statut inconnu";
  }
};

/**
 * Couleurs associées au statut d'avis d'un participant sur le rapport (pour badge/Chip)
 * (pour correspondre à l'image fournie)
 */
export const participantReportStatusColors: Record<
  ENUM_PARTICIPANT_REPORT_STATUS,
  { bg: string; text: string }
> = {
  NON_LU: { bg: "bg-[#fff4ed]", text: "text-[#f08c50]" }, // orange pale
  NON_TRAITE: { bg: "bg-[#fff1f0]", text: "text-[#f75555]" }, // rouge pale
  LU: { bg: "bg-[#f5f7fd]", text: "text-[#5078f0]" }, // bleu pale
  TRAITE: { bg: "bg-[#e6f5f0]", text: "text-[#2ac693]" }, // vert pale
};
