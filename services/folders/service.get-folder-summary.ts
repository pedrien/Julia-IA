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
import { SummaryFolderSchema } from "@/validators/folders/validator.summary-folder";
import { auth } from "@/auth";

/**
 * Fetches the summary for a specific folder from the remote API.
 *
 * @function getFolderSummary
 * @param {string} folderId - The ID of the folder
 * @returns {Promise<(IActionSuccess & { data: SummaryFolderSchema }) | IActionError>}
 *   An object indicating the success or failure of the operation, and the folder summary if successful.
 *
 * - Requires a valid user session (access token).
 * - Returns an error if the session is missing or expired.
 * - On HTTP request failure, returns an appropriate error message.
 * - On success, returns the folder summary.
 *
 * Example usage:
 *   const result = await getFolderSummary("folder-1");
 *   if (result.success) {
 *     // Access result.data.summary
 *   } else {
 *     // Handle result.error
 *   }
 */
export const getFolderSummary = actionClient.action(
  async (
    folderId: string
  ): Promise<
    (IActionSuccess & { data: SummaryFolderSchema }) | IActionError
  > => {
    try {
      const session = await auth();
      if (!session) {
        return {
          success: false,
          error: [APP_CONSTANTS.MESSAGE_AUTH_NO_ACTIVE_SESSION],
        };
      }

      const response = await axios.get(
        `${ENV.API_LOCAL_BASE_URL}folders/${folderId}/summary`,
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

      const responseData: SummaryFolderSchema = response.data.data;
      return { success: true, data: responseData };
    } catch (error) {
      return {
        success: false,
        error: handleServerActionError(error).error,
      };
    }
  }
);
