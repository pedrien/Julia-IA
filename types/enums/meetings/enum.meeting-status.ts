import { z } from "zod";

/**
 * Enum pour le statut d'un meeting : EN_ATTENTE, EN_COURS, TRAITE, LU
 */
export const ENUM_MEETING_STATUS = z.enum([
  "EN_ATTENTE", // en attente
  "EN_COURS", // en cours
  "TRAITE", // traité
  "LU", // lu
]);

export type ENUM_MEETING_STATUS = z.infer<typeof ENUM_MEETING_STATUS>;

export const helpEnumMeetingStatus = (status: ENUM_MEETING_STATUS) => {
  switch (status) {
    case "EN_ATTENTE":
      return "En attente";
    case "EN_COURS":
      return "En cours";
    case "TRAITE":
      return "Traité";
    case "LU":
      return "Lu";
    default:
      return "Statut inconnu";
  }
};
