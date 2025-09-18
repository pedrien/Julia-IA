"use client";

import {
  useCustomMutation,
  MutationResult,
} from "@/hooks/common/hook.use-mutation";
import { shareMeeting } from "@/services/meetings/service.share-meeting";
import { SharingMeetingParticipant } from "@/validators/meetings/validator.sharing-meeting";
import { IActionSuccess } from "@/interfaces/interface.result-actions";

// Type pour les paramètres supplémentaires
export interface ShareMeetingOptions {
  onSuccessCallback?: (
    data: MutationResult<
      IActionSuccess & { data: { shared: boolean; meeting_id: string } }
    >,
    meetingData: SharingMeetingParticipant
  ) => void;
}

export const useShareMeeting = (options?: ShareMeetingOptions) => {
  return useCustomMutation<
    IActionSuccess & { data: { shared: boolean; meeting_id: string } },
    SharingMeetingParticipant
  >({
    mutationFn: shareMeeting,
    messages: {
      success: "Réunion partagée avec succès",
      error:
        "Une erreur s'est produite lors du partage de la réunion. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
    },
    invalidateQueries: ["list-meetings"],
    onSuccess: (data, variables) => {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data, variables);
      }
    },
  });
};
