"use server";

import { APP_CONSTANTS } from "@/constants/appConstants";
import { ENV } from "@/env";
import {
  IActionError,
  IActionSuccess,
} from "@/interfaces/interface.result-actions";
import { handleServerActionError } from "@/libs/handleServerActionError";
import { actionClient } from "@/libs/safeAction";
import axios from "axios";
import { createFolderSchema } from "@/validators/folders/validator.create-folder";
import { auth } from "@/auth";

/**
 * Creates a new folder by sending a POST request to the API.
 *
 * @function createFolder
 * @description
 * This server action creates a new folder using the provided input data.
 * It validates the input against the folder creation schema, retrieves the current user session,
 * and sends a POST request to the folders API endpoint. The function returns a success object
 * if the operation is successful, or an error object otherwise.
 *
 * @returns {Promise<IActionSuccess | IActionError>}
 * Returns a promise that resolves to either a success object,
 * or an error object with error messages.
 *
 * @example
 * const result = await createFolder({
 *   nom_dossier: "Mon Dossier",
 *   description: "Description du dossier",
 *   fichier: fileObject,
 *   size: 1024
 * });
 * if (result.success) {
 *   // Handle success
 * } else {
 *   // Handle error, access result.error
 * }
 */
export const createFolder = actionClient
  .inputSchema(createFolderSchema)
  .action(async ({ parsedInput }): Promise<IActionSuccess | IActionError> => {
    try {
      const session = await auth();
      if (!session) {
        return {
          success: false,
          error: [APP_CONSTANTS.MESSAGE_AUTH_NO_ACTIVE_SESSION],
        };
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("nom_dossier", parsedInput.nom_dossier);
      formData.append("description", parsedInput.description);
      formData.append("fichier", parsedInput.fichier);
      formData.append("size", parsedInput.size.toString());

      const response = await axios.post(
        `${ENV.API_LOCAL_BASE_URL}folders/create`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session.token.access_token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status !== 201) {
        const errorResponse = response.data?.error || "Unknown error";
        return {
          success: false,
          error: [
            errorResponse ||
              "There seems to be an error with the information you provided.",
          ],
        };
      }

      return { success: true };
    } catch (error) {
      return { success: false, error: handleServerActionError(error).error };
    }
  });
