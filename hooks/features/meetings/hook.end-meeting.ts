"use client";

import {
  useCustomMutation,
  MutationResult,
} from "@/hooks/common/hook.use-mutation";
import { endMeeting } from "@/services/meetings/service.end-meeting";
import { EndMeetingSchema } from "@/validators/meetings/validator.end-meeting";
import { IActionSuccess } from "@/interfaces/interface.result-actions";

// Type pour les paramètres supplémentaires
export interface EndMeetingOptions {
  onSuccessCallback?: (
    data: MutationResult<IActionSuccess>,
    meetingData: EndMeetingSchema
  ) => void;
}

export const useEndMeeting = (options?: EndMeetingOptions) => {
  return useCustomMutation<IActionSuccess, EndMeetingSchema>({
    mutationFn: endMeeting,
    messages: {
      success: "Réunion terminée avec succès",
      error:
        "Une erreur s'est produite lors de la fin de la réunion. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
    },
    invalidateQueries: ["list-meetings", "meeting-details"],
    onSuccess: (data, variables) => {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data, variables);
      }
    },
  });
};
