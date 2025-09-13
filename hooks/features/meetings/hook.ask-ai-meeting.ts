"use client";

import {
  useCustomMutation,
  MutationResult,
} from "@/hooks/common/hook.use-mutation";
import { askAiMeeting } from "@/services/meetings/service.ask-ai-meeting";
import { AskAiMeetingSchema } from "@/validators/meetings/validator.ask-ai-meeting";
import { IActionSuccess } from "@/interfaces/interface.result-actions";

// Type pour les paramètres de la question
export interface AskAiMeetingParams {
  meetingId: string;
  message: string;
}

// Type pour les paramètres supplémentaires
export interface AskAiMeetingOptions {
  onSuccessCallback?: (
    data: MutationResult<IActionSuccess & { data: AskAiMeetingSchema }>,
    questionData: AskAiMeetingParams
  ) => void;
  onErrorCallback?: (error: Error, questionData: AskAiMeetingParams) => void;
}

/**
 * Hook personnalisé pour envoyer une question à l'IA à propos d'une réunion spécifique.
 *
 * @param {AskAiMeetingOptions} [options] - Callbacks optionnels pour la gestion du succès et des erreurs.
 * @returns {MutationResult<IActionSuccess & { data: AskAiMeetingSchema }>, AskAiMeetingParams>}
 *
 * - Utilise un hook de mutation personnalisé pour gérer l'appel API et l'état.
 * - En cas de succès, invalide la requête "meeting-chat" pour rafraîchir la conversation.
 * - Fournit des messages de succès et d'erreur personnalisables (en français).
 * - Permet de passer des callbacks personnalisés pour les événements de succès et d'erreur.
 */
export const useAskAiMeeting = (options?: AskAiMeetingOptions) => {
  return useCustomMutation<
    IActionSuccess & { data: AskAiMeetingSchema },
    AskAiMeetingParams
  >({
    mutationFn: askAiMeeting,
    messages: {
      success: "Question envoyée à l'IA avec succès",
      error:
        "Une erreur s'est produite lors de l'envoi de votre question à l'IA. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
    },
    invalidateQueries: ["meeting-chat"], // Invalide le cache des chats pour rafraîchir la conversation
    onSuccess: (data, variables) => {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data, variables);
      }
    },
    onError: (error, variables) => {
      if (options?.onErrorCallback) {
        options.onErrorCallback(error as Error, variables);
      }
    },
  });
};
