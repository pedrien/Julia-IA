"use client";

import {
  useCustomMutation,
  MutationResult,
} from "@/hooks/common/hook.use-mutation";
import { fetchPdfFile } from "@/services/meetings/service.fetch-pdf";
import { FetchPdfRequest } from "@/validators/meetings/validator.fetch-pdf";

// Type pour les paramètres supplémentaires
export interface FetchPdfOptions {
  onSuccessCallback?: (
    data: MutationResult<ArrayBuffer>,
    requestData: FetchPdfRequest
  ) => void;
}

export const useFetchPdf = (options?: FetchPdfOptions) => {
  return useCustomMutation<ArrayBuffer, FetchPdfRequest>({
    mutationFn: fetchPdfFile,
    messages: {
      success: "Fichier PDF récupéré avec succès",
      error:
        "Une erreur s'est produite lors de la récupération du fichier PDF. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
    },
    useLoading: false,
    showToast: false,
    onSuccess: (data, variables) => {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data, variables);
      }
    },
  });
};
