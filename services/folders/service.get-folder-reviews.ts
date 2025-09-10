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
import { ListReviewFolderSchema } from "@/validators/folders/validator.review-folder";
import { auth } from "@/auth";

/**
 * Fetches all reviews for a specific folder from the remote API.
 *
 * @function getFolderReviews
 * @param {string} folderId - The ID of the folder
 * @returns {Promise<(IActionSuccess & { data: ListReviewFolderSchema }) | IActionError>}
 *   An object indicating the success or failure of the operation, and the folder reviews if successful.
 *
 * - Requires a valid user session (access token).
 * - Returns an error if the session is missing or expired.
 * - On HTTP request failure, returns an appropriate error message.
 * - On success, returns the list of folder reviews.
 *
 * Example usage:
 *   const result = await getFolderReviews("folder-1");
 *   if (result.success) {
 *     // Access result.data.data
 *   } else {
 *     // Handle result.error
 *   }
 */
export const getFolderReviews = actionClient.action(
  async (
    folderId: string
  ): Promise<
    (IActionSuccess & { data: ListReviewFolderSchema }) | IActionError
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
        `${ENV.API_LOCAL_BASE_URL}folders/${folderId}/reviews`,
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

      const responseData: ListReviewFolderSchema = response.data.data;
      return { success: true, data: responseData };
    } catch (error) {
      return {
        success: false,
        error: handleServerActionError(error).error,
      };
    }
  }
);
