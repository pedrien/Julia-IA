import { z } from "zod";

/**
 * Enum pour le type d'utilisateur dans le chat : AI ou USER
 */
export const ENUM_TYPE_USER_CHAT = z.enum([
  "AI", // Intelligence Artificielle
  "USER", // Utilisateur humain
]);
export type ENUM_TYPE_USER_CHAT = z.infer<typeof ENUM_TYPE_USER_CHAT>;

/**
 * Helper pour obtenir le label lisible d'un type d'utilisateur du chat
 */
export const getTypeUserChatLabel = (type: ENUM_TYPE_USER_CHAT): string => {
  switch (type) {
    case "AI":
      return "Intelligence Artificielle";
    case "USER":
      return "Utilisateur humain";
    default:
      return type;
  }
};
