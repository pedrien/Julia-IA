"use client";

import {
  useCustomMutation,
  MutationResult,
} from "@/hooks/common/hook.use-mutation";
import { markMeetingTraited } from "@/services/meetings/service.mark-meeting-traited";
import { MarkMeetingTraited } from "@/validators/meetings/validator.mark-meeting-traited";
import { IActionSuccess } from "@/interfaces/interface.result-actions";

// Type pour les paramètres supplémentaires
export interface MarkMeetingTraitedOptions {
  onSuccessCallback?: (
    data: MutationResult<
      IActionSuccess & {
        data: {
          meetingId: string;
          status: string;
          treatedAt: string;
        };
      }
    >,
    meetingData: MarkMeetingTraited
  ) => void;
}

export const useMarkMeetingTraited = (options?: MarkMeetingTraitedOptions) => {
  return useCustomMutation<
    IActionSuccess & {
      data: {
        meetingId: string;
        status: string;
        treatedAt: string;
      };
    },
    MarkMeetingTraited
  >({
    mutationFn: markMeetingTraited,
    messages: {
      success: "Réunion marquée comme traitée avec succès",
      error:
        "Une erreur s'est produite lors du marquage de la réunion. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
    },
    invalidateQueries: ["list-meetings", "detail-meeting"],
    onSuccess: (data, variables) => {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data, variables);
      }
    },
  });
};
