"use client";

import {
  useCustomMutation,
  MutationResult,
} from "@/hooks/common/hook.use-mutation";
import { startMeeting } from "@/services/meetings/service.start-meeting";
import { StartMeetingSchema } from "@/validators/meetings/validator.start-meeting";
import { IActionSuccess } from "@/interfaces/interface.result-actions";

// Type pour les paramètres supplémentaires
export interface StartMeetingOptions {
  onSuccessCallback?: (
    data: MutationResult<IActionSuccess>,
    meetingData: StartMeetingSchema
  ) => void;
}

export const useStartMeeting = (options?: StartMeetingOptions) => {
  return useCustomMutation<IActionSuccess, StartMeetingSchema>({
    mutationFn: startMeeting,
    messages: {
      success: "Réunion démarrée avec succès",
      error:
        "Une erreur s'est produite lors du démarrage de la réunion. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
    },
    invalidateQueries: ["list-meetings", "meeting-details"],
    onSuccess: (data, variables) => {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data, variables);
      }
    },
  });
};
