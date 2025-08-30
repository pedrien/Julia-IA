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
import { startMeetingSchema } from "@/validators/meetings/validator.start-meeting";
import { auth } from "@/auth";

/**
 * Starts a meeting by sending a POST request to the API.
 *
 * @function startMeeting
 * @description
 * This server action starts a meeting using the provided meeting ID.
 * It validates the input against the start meeting schema, retrieves the current user session,
 * and sends a POST request to the meetings start API endpoint. The function returns a success object
 * if the operation is successful, or an error object otherwise.
 *
 * @returns {Promise<IActionSuccess | IActionError>}
 * Returns a promise that resolves to either a success object or an error object with error messages.
 *
 * @example
 * const result = await startMeeting({
 *   id_meeting: "0198e245-3fac-72a1-802d-5d3bfa164587"
 * });
 * if (result.success) {
 *   // Handle success
 * } else {
 *   // Handle error, access result.error
 * }
 */
export const startMeeting = actionClient
  .inputSchema(startMeetingSchema)
  .action(async ({ parsedInput }): Promise<IActionSuccess | IActionError> => {
    try {
      const session = await auth();
      if (!session) {
        return {
          success: false,
          error: [APP_CONSTANTS.MESSAGE_AUTH_NO_ACTIVE_SESSION],
        };
      }

      const response = await axios.post(
        `${ENV.API_LOCAL_BASE_URL}meetings/${parsedInput.id_meeting}/start`,
        {},
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
