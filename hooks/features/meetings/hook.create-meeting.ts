"use client";

import {
  useCustomMutation,
  MutationResult,
} from "@/hooks/common/hook.use-mutation";
import { createMeeting } from "@/services/meetings/service.create-meeting";
import {
  CreateMeetingSchema,
  ResponseCreateMeetingSchema,
} from "@/validators/meetings/validator.create-meeting";
import { IActionSuccess } from "@/interfaces/interface.result-actions";

// Type pour les paramètres supplémentaires
export interface CreateMeetingOptions {
  onSuccessCallback?: (
    data: MutationResult<
      IActionSuccess & { data: ResponseCreateMeetingSchema }
    >,
    meetingData: CreateMeetingSchema
  ) => void;
}

export const useCreateMeeting = (options?: CreateMeetingOptions) => {
  return useCustomMutation<
    IActionSuccess & { data: ResponseCreateMeetingSchema },
    CreateMeetingSchema
  >({
    mutationFn: createMeeting,
    messages: {
      success: "Réunion créée avec succès",
      error:
        "Une erreur s'est produite lors de la création de la réunion. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
    },
    invalidateQueries: ["list-meetings"],
    onSuccess: (data, variables) => {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data, variables);
      }
    },
  });
};
