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
import { auth } from "@/auth";
import { ListMeetings } from "@/validators/meetings/validator.list-meeting";

/**
 * Fetches a list of meetings from the remote API.
 *
 * @function getListMeetings
 * @returns {Promise<(IActionSuccess & { data: ListMeetingSchema }) | IActionError>}
 *   An object indicating the success or failure of the operation, and the meetings list data if successful.
 *
 * - Requires a valid user session (access token).
 * - Returns an error if the session is missing or expired.
 * - On HTTP request failure, returns an appropriate error message.
 * - On success, returns the list of meetings.
 *
 * Example usage:
 *   const result = await getListMeetings();
 *   if (result.success) {
 *     // Access result.data
 *   } else {
 *     // Handle result.error
 *   }
 */
export const getListMeetings = actionClient.action(
  async (): Promise<
    (IActionSuccess & { data: ListMeetings }) | IActionError
  > => {
    try {
      const session = await auth();
      if (!session) {
        return {
          success: false,
          error: [APP_CONSTANTS.MESSAGE_AUTH_NO_ACTIVE_SESSION],
        };
      }

      const response = await axios.get(`${ENV.API_LOCAL_BASE_URL}meetings`, {
        headers: {
          Authorization: `Bearer ${session.token.access_token}`,
        },
      });

      if (response.status !== 200) {
        const errorResponse = response.data?.error || "Unknown error";
        return {
          success: false,
          error:
            errorResponse ||
            "There seems to be an error with the information you provided.",
        };
      }

      const responseData: ListMeetings = response.data.data;
      return { success: true, data: responseData };
    } catch (error) {
      return {
        success: false,
        error: handleServerActionError(error).error,
      };
    }
  }
);
