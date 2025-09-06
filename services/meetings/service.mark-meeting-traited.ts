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
import { markMeetingTraitedSchema } from "@/validators/meetings/validator.mark-meeting-traited";
import { auth } from "@/auth";

/**
 * Marks a meeting as treated/processed.
 *
 * @function markMeetingTraited
 * @param {string} meetingId - The ID of the meeting to mark as treated
 * @returns {Promise<(IActionSuccess & { data: { meetingId: string; status: string; treatedAt: string } }) | IActionError>}
 *   An object indicating the success or failure of the operation, and the meeting status if successful.
 *
 * - Requires a valid user session (access token).
 * - Returns an error if the session is missing or expired.
 * - On HTTP request failure, returns an appropriate error message.
 * - On success, returns the meeting status update confirmation.
 *
 * Example usage:
 *   const result = await markMeetingTraited("meeting-123");
 *   if (result.success) {
 *     // Access result.data for the meeting status
 *   } else {
 *     // Handle result.error
 *   }
 */
export const markMeetingTraited = actionClient
  .inputSchema(markMeetingTraitedSchema)
  .action(async ({ parsedInput }): Promise<IActionSuccess | IActionError> => {
    try {
      const session = await auth();
      if (!session) {
        return {
          success: false,
          error: [APP_CONSTANTS.MESSAGE_AUTH_NO_ACTIVE_SESSION],
        };
      }

      const response = await axios.patch(
        `${ENV.API_LOCAL_BASE_URL}meetings/${parsedInput.meetingId}/mark-traited`,
        {},
        {
          headers: {
            Authorization: `Bearer ${session.token.access_token}`,
            "Content-Type": "application/json",
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

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: handleServerActionError(error).error,
      };
    }
  });
