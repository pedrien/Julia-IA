"use client";

import {
  useCustomMutation,
  MutationResult,
} from "@/hooks/common/hook.use-mutation";
import { generateRapport } from "@/services/meetings/service.generate-rapport";
import { GenerateRapportSchema } from "@/validators/meetings/validator.generate-rapport";
import { IActionSuccess } from "@/interfaces/interface.result-actions";

// Type pour les paramètres supplémentaires
export interface GenerateRapportOptions {
  onSuccessCallback?: (
    data: MutationResult<IActionSuccess>,
    meetingId: GenerateRapportSchema
  ) => void;
}

export const useGenerateRapport = (options?: GenerateRapportOptions) => {
  return useCustomMutation<IActionSuccess, GenerateRapportSchema>({
    mutationFn: generateRapport,
    messages: {
      success: "Rapport généré avec succès",
      error:
        "Une erreur s'est produite lors de la génération du rapport. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
    },
    invalidateQueries: ["meeting-details", "list-meetings"],
    onSuccess: (data, variables) => {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data, variables);
      }
    },
  });
};
