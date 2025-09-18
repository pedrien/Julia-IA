"use client";

import {
  useCustomMutation,
  MutationResult,
} from "@/hooks/common/hook.use-mutation";
import { generateTranscription } from "@/services/meetings/service.generate-transcription";
import { GenerateTranscriptionSchema } from "@/validators/meetings/validator.generate-transcription";
import { IActionSuccess } from "@/interfaces/interface.result-actions";

// Type pour les paramètres supplémentaires
export interface GenerateTranscriptionOptions {
  onSuccessCallback?: (
    data: MutationResult<IActionSuccess>,
    meetingId: GenerateTranscriptionSchema
  ) => void;
}

export const useGenerateTranscription = (
  options?: GenerateTranscriptionOptions
) => {
  return useCustomMutation<IActionSuccess, GenerateTranscriptionSchema>({
    mutationFn: generateTranscription,
    messages: {
      success: "Transcription générée avec succès",
      error:
        "Une erreur s'est produite lors de la génération de la transcription. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
    },
    invalidateQueries: ["meeting-details", "list-meetings"],
    onSuccess: (data, variables) => {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data, variables);
      }
    },
  });
};
