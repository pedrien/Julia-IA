"use client";

import {
  useCustomMutation,
  MutationResult,
} from "@/hooks/common/hook.use-mutation";
import { addMeetingObservation } from "@/services/meetings/service.add-meeting-observation";
import { AddObservation } from "@/validators/meetings/validator.add-obersvation";
import { IActionSuccess } from "@/interfaces/interface.result-actions";

// Type pour les paramètres supplémentaires
export interface AddObservationOptions {
  onSuccessCallback?: (
    data: MutationResult<IActionSuccess>,
    observationData: AddObservation
  ) => void;
}

export const useAddMeetingObservation = (options?: AddObservationOptions) => {
  return useCustomMutation<IActionSuccess, AddObservation>({
    mutationFn: addMeetingObservation,
    messages: {
      success: "Observation ajoutée avec succès",
      error:
        "Une erreur s'est produite lors de l'ajout de l'observation. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
    },
    invalidateQueries: ["get-participant-observations"],
    onSuccess: (data, variables) => {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data, variables);
      }
    },
  });
};
