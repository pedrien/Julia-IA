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
  ListOberservationParticipants,
  getParticipantObservationsSchema,
} from "@/validators/participants/validator.list-oberservation-participants";
import { auth } from "@/auth";

/**
 * Fetches the observations for a specific participant in a specific meeting from the remote API.
 *
 * @function getParticipantObservations
 * @param {string} meetingId - The ID of the meeting
 * @param {string} participantId - The ID of the participant
 * @returns {Promise<(IActionSuccess & { data: ListOberservationParticipants }) | IActionError>}
 *   An object indicating the success or failure of the operation, and the participant observations if successful.
 *
 * - Requires a valid user session (access token).
 * - Returns an error if the session is missing or expired.
 * - On HTTP request failure, returns an appropriate error message.
 * - On success, returns the participant observations with content and timestamps.
 *
 * Example usage:
 *   const result = await getParticipantObservations("meeting-123", "participant-456");
 *   if (result.success) {
 *     // Access result.data.data for the observations array
 *   } else {
 *     // Handle result.error
 *   }
 */
export const getParticipantObservations = actionClient
  .inputSchema(getParticipantObservationsSchema)
  .action(
    async ({
      parsedInput,
    }): Promise<
      (IActionSuccess & { data: ListOberservationParticipants }) | IActionError
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
          `${ENV.API_LOCAL_BASE_URL}meetings/${parsedInput.meetingId}/observations?participantId=${parsedInput.participantId}`,
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

        const responseData: ListOberservationParticipants = response.data.data;
        return { success: true, data: responseData };
      } catch (error) {
        return {
          success: false,
          error: handleServerActionError(error).error,
        };
      }
    }
  );
