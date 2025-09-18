"use client";

import {
  useCustomMutation,
  MutationResult,
} from "@/hooks/common/hook.use-mutation";
import { createFolder } from "@/services/folders/service.create-folder";
import { CreateFolderSchema } from "@/validators/folders/validator.create-folder";
import { IActionSuccess } from "@/interfaces/interface.result-actions";

// Type pour les paramètres supplémentaires
export interface CreateFolderOptions {
  onSuccessCallback?: (
    data: MutationResult<IActionSuccess>,
    folderData: CreateFolderSchema
  ) => void;
}

export const useCreateFolder = (options?: CreateFolderOptions) => {
  return useCustomMutation<IActionSuccess, CreateFolderSchema>({
    mutationFn: createFolder,
    messages: {
      success: "Dossier créé avec succès",
      error:
        "Une erreur s'est produite lors de la création du dossier. Veuillez réessayer plus tard ou contacter le support si le problème persiste.",
    },
    invalidateQueries: ["list-folders"],
    onSuccess: (data, variables) => {
      if (options?.onSuccessCallback) {
        options.onSuccessCallback(data, variables);
      }
    },
  });
};
