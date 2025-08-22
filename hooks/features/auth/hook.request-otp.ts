"use client";

import {
  useCustomMutation,
  MutationResult,
} from "@/hooks/common/hook.use-mutation";
import { requestOtp } from "@/services/auth/service.request-otp";
import { RequestOtpFormData } from "@/validators/auth/validator.request-otp";

// Type pour les paramètres supplémentaires
export interface RequestOtpOptions {
  onSuccessCallback?: (
    data: MutationResult<{
      success: boolean;
      message?: string;
      error?: string;
    }>,
    otpData: RequestOtpFormData
  ) => void;
}

export const useRequestOtp = (options?: RequestOtpOptions) => {
  return useCustomMutation<
    { success: boolean; message?: string; error?: string },
    RequestOtpFormData
  >({
    mutationFn: requestOtp,
    messages: {
      success: "Code de vérification envoyé avec succès",
      error:
        "Une erreur s'est produite lors de l'envoi du code de vérification. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
    },
    onSuccess: (data, variables) => {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data, variables);
      }
    },
  });
};
