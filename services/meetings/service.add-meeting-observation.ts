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
import { addObservationSchema } from "@/validators/meetings/validator.add-obersvation";
import { auth } from "@/auth";

/**
 * Adds a new observation for a specific participant in a specific meeting.
 *
 * @function addMeetingObservation
 * @param {string} meetingId - The ID of the meeting
 * @param {string} participantId - The ID of the participant
 * @param {string} content - The observation content
 * @returns {Promise<(IActionSuccess & { data: AddObservationResponse }) | IActionError>}
 *   An object indicating the success or failure of the operation, and the created observation if successful.
 *
 * - Requires a valid user session (access token).
 * - Returns an error if the session is missing or expired.
 * - On HTTP request failure, returns an appropriate error message.
 * - On success, returns the created observation with ID, content and timestamp.
 *
 * Example usage:
 *   const result = await addMeetingObservation("meeting-123", "participant-456", "Excellente participation");
 *   if (result.success) {
 *     // Access result.data for the created observation
 *   } else {
 *     // Handle result.error
 *   }
 */
export const addMeetingObservation = actionClient
  .inputSchema(addObservationSchema)
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
        `${ENV.API_LOCAL_BASE_URL}meetings/${parsedInput.meetingId}/observations`,
        {
          content: parsedInput.content,
          meeting_id: parsedInput.meetingId,
        },
        {
          headers: {
            Authorization: `Bearer ${session.token.access_token}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status !== 201) {
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
