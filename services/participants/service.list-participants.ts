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
import { ListParticipants } from "@/validators/participants/validator.list-participants";
import { auth } from "@/auth";

/**
 * Fetches a list of participants from the remote API.
 *
 * @function getListParticipants
 * @returns {Promise<(IActionSuccess & { data: ListParticipants }) | IActionError>}
 *   An object indicating the success or failure of the operation, and the participants list data if successful.
 *
 * - Requires a valid user session (access token).
 * - Returns an error if the session is missing or expired.
 * - On HTTP request failure, returns an appropriate error message.
 * - On success, returns the list of participants.
 *
 * Example usage:
 *   const result = await getListParticipants();
 *   if (result.success) {
 *     // Access result.data
 *   } else {
 *     // Handle result.error
 *   }
 */
export const getListParticipants = actionClient.action(
  async (): Promise<
    (IActionSuccess & { data: ListParticipants }) | IActionError
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
        `${ENV.API_LOCAL_BASE_URL}participants`,
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

      const responseData: ListParticipants = response.data.data;
      return { success: true, data: responseData };
    } catch (error) {
      return {
        success: false,
        error: handleServerActionError(error).error,
      };
    }
  }
);
