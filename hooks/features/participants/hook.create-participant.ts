"use client";

import {
  useCustomMutation,
  MutationResult,
} from "@/hooks/common/hook.use-mutation";
import { createParticipant } from "@/services/participants/service.create-participant";
import { CreateParticipantSchema } from "@/validators/participants/validator.create-participant";
import { IActionSuccess } from "@/interfaces/interface.result-actions";

// Type pour les paramètres supplémentaires
export interface CreateParticipantOptions {
  onSuccessCallback?: (
    data: MutationResult<IActionSuccess>,
    participantData: CreateParticipantSchema
  ) => void;
}

export const useCreateParticipant = (options?: CreateParticipantOptions) => {
  return useCustomMutation<IActionSuccess, CreateParticipantSchema>({
    mutationFn: createParticipant,
    messages: {
      success: "Participant créé avec succès",
      error:
        "Une erreur s'est produite lors de la création du participant. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
    },
    invalidateQueries: ["list-participants"],
    onSuccess: (data, variables) => {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data, variables);
      }
    },
  });
};
