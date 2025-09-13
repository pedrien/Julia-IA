"use client";

import {
  useCustomMutation,
  MutationResult,
} from "@/hooks/common/hook.use-mutation";
import { addInternalParticipantsMeeting } from "@/services/meetings/service.add-internal-participants-meeting";
import { AddInternalParticipantSchema } from "@/validators/meetings/validator.add-internal-participant";
import { IActionSuccess } from "@/interfaces/interface.result-actions";

// Type pour les paramètres supplémentaires
export interface AddInternalParticipantsMeetingOptions {
  onSuccessCallback?: (
    data: MutationResult<IActionSuccess>,
    participantData: AddInternalParticipantSchema
  ) => void;
  onErrorCallback?: (
    error: Error,
    participantData: AddInternalParticipantSchema
  ) => void;
}

/**
 * Hook personnalisé pour ajouter des participants internes à une réunion spécifique.
 *
 * @param {AddInternalParticipantsMeetingOptions} [options] - Callbacks optionnels pour la gestion du succès et des erreurs.
 * @returns {MutationResult<IActionSuccess>, AddInternalParticipantSchema>}
 *
 * - Utilise un hook de mutation personnalisé pour gérer l'appel API et l'état.
 * - En cas de succès, invalide la requête "meeting-participants" pour rafraîchir la liste des participants.
 * - Fournit des messages de succès et d'erreur personnalisables (en français).
 * - Permet de passer des callbacks personnalisés pour les événements de succès et d'erreur.
 */
export const useAddInternalParticipantsMeeting = (
  options?: AddInternalParticipantsMeetingOptions
) => {
  return useCustomMutation<IActionSuccess, AddInternalParticipantSchema>({
    mutationFn: addInternalParticipantsMeeting,
    messages: {
      success: "Participants internes ajoutés à la réunion avec succès",
      error:
        "Une erreur s'est produite lors de l'ajout des participants internes à la réunion. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
    },
    invalidateQueries: ["meeting-participants", "list-meetings"], // Invalide les caches des participants et des meetings
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
