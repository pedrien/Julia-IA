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
import { FileFolderSchema } from "@/validators/folders/validator.file-folder";
import { auth } from "@/auth";

/**
 * Fetches the file URL for a specific folder from the remote API.
 *
 * @function getFolderFile
 * @param {string} folderId - The ID of the folder
 * @returns {Promise<(IActionSuccess & { data: FileFolderSchema }) | IActionError>}
 *   An object indicating the success or failure of the operation, and the folder file data if successful.
 *
 * - Requires a valid user session (access token).
 * - Returns an error if the session is missing or expired.
 * - On HTTP request failure, returns an appropriate error message.
 * - On success, returns the folder file URL.
 *
 * Example usage:
 *   const result = await getFolderFile("folder-1");
 *   if (result.success) {
 *     // Access result.data.file_url
 *   } else {
 *     // Handle result.error
 *   }
 */
export const getFolderFile = actionClient.action(
  async (
    folderId: string
  ): Promise<(IActionSuccess & { data: FileFolderSchema }) | IActionError> => {
    try {
      const session = await auth();
      if (!session) {
        return {
          success: false,
          error: [APP_CONSTANTS.MESSAGE_AUTH_NO_ACTIVE_SESSION],
        };
      }

      const response = await axios.get(
        `${ENV.API_LOCAL_BASE_URL}folders/${folderId}/file`,
        {
          headers: {
            Authorization: `Bearer ${session.token.access_token}`,
          },
        }
      );

      if (response.status !== 200) {
        const errorResponse = response.data?.error || "Unknown error";
        return {
          success: false,
          error:
            errorResponse ||
            "There seems to be an error with the information you provided.",
        };
      }

      const responseData: FileFolderSchema = response.data.data;
      return { success: true, data: responseData };
    } catch (error) {
      return {
        success: false,
        error: handleServerActionError(error).error,
      };
    }
  }
);
