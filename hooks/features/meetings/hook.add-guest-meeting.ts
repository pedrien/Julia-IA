"use client";

import {
  useCustomMutation,
  MutationResult,
} from "@/hooks/common/hook.use-mutation";
import { addGuestMeeting } from "@/services/meetings/service.add-guest-meeting";
import { AddGuestMeetingSchema } from "@/validators/meetings/validator.add-guest-meeting";
import { IActionSuccess } from "@/interfaces/interface.result-actions";

// Type pour les paramètres supplémentaires
export interface AddGuestMeetingOptions {
  onSuccessCallback?: (
    data: MutationResult<IActionSuccess>,
    guestData: AddGuestMeetingSchema
  ) => void;
  onErrorCallback?: (error: Error, guestData: AddGuestMeetingSchema) => void;
}

/**
 * Hook personnalisé pour ajouter un invité à une réunion spécifique.
 *
 * @param {AddGuestMeetingOptions} [options] - Callbacks optionnels pour la gestion du succès et des erreurs.
 * @returns {MutationResult<IActionSuccess>, AddGuestMeetingSchema>}
 *
 * - Utilise un hook de mutation personnalisé pour gérer l'appel API et l'état.
 * - En cas de succès, invalide la requête "meeting-participants" pour rafraîchir la liste des participants.
 * - Fournit des messages de succès et d'erreur personnalisables (en français).
 * - Permet de passer des callbacks personnalisés pour les événements de succès et d'erreur.
 */
export const useAddGuestMeeting = (options?: AddGuestMeetingOptions) => {
  return useCustomMutation<IActionSuccess, AddGuestMeetingSchema>({
    mutationFn: addGuestMeeting,
    messages: {
      success: "Invité ajouté à la réunion avec succès",
      error:
        "Une erreur s'est produite lors de l'ajout de l'invité à la réunion. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
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
