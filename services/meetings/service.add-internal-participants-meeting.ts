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
import {
  addInternalParticipantSchema,
  AddInternalParticipantSchema,
} from "@/validators/meetings/validator.add-internal-participant";
import { auth } from "@/auth";

/**
 * Adds internal participants to a specific meeting.
 *
 * @function addInternalParticipantsMeeting
 * @param {string} meetingId - The ID of the meeting
 * @param {string[]} participantIds - Array of participant IDs to add
 * @returns {Promise<IActionSuccess | IActionError>}
 *   An object indicating the success or failure of the operation.
 *
 * - Requires a valid user session (access token).
 * - Returns an error if the session is missing or expired.
 * - On HTTP request failure, returns an appropriate error message.
 * - On success, returns success confirmation.
 *
 * Example usage:
 *   const result = await addInternalParticipantsMeeting({
 *     meetingId: "meeting-123",
 *     participantIds: ["participant-1", "participant-2", "participant-3"]
 *   });
 *   if (result.success) {
 *     // Participants added successfully
 *   } else {
 *     // Handle result.error
 *   }
 */
export const addInternalParticipantsMeeting = actionClient
  .inputSchema(addInternalParticipantSchema)
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
        `${ENV.API_LOCAL_BASE_URL}meetings/${parsedInput.meetingId}/add-internal-participants`,
        parsedInput,
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
