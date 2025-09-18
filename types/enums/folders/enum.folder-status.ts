import { z } from "zod";

/**
 * Enum pour le statut d'un dossier : EN_COURS, TRAITE
 */
export const ENUM_FOLDER_STATUS = z.enum([
  "EN_COURS", // en cours
  "TRAITE", // traité
]);
export type ENUM_FOLDER_STATUS = z.infer<typeof ENUM_FOLDER_STATUS>;

/**
 * Texte d'aide pour le statut d'un dossier
 */
export const helpEnumFolderStatus = (status: ENUM_FOLDER_STATUS) => {
  switch (status) {
    case "EN_COURS":
      return "En cours";
    case "TRAITE":
      return "Traité";
    default:
      return "Statut inconnu";
  }
};
