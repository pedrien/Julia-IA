import { z } from "zod";

/**
 * Enum pour le type de participant d'un meeting : INTERNE ou EXTERNE
 */
export const ENUM_PARTICIPANT_TYPE = z.enum(["INTERNE", "EXTERNE"]);

export type ENUM_PARTICIPANT_TYPE = z.infer<typeof ENUM_PARTICIPANT_TYPE>;

export const helpEnumParticipantType = (type: ENUM_PARTICIPANT_TYPE) => {
  switch (type) {
    case "INTERNE":
      return "Interne";
    case "EXTERNE":
      return "Externe";
    default:
      return "Type inconnu";
  }
};
