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
import { endMeetingSchema } from "@/validators/meetings/validator.end-meeting";
import { auth } from "@/auth";

/**
 * Ends a meeting by sending a POST request with audio file to the API.
 *
 * @function endMeeting
 * @description
 * This server action ends a meeting using the provided meeting ID and audio file.
 * It validates the input against the end meeting schema, retrieves the current user session,
 * and sends a POST request with FormData to the meetings end API endpoint. The function returns a success object
 * if the operation is successful, or an error object otherwise.
 *
 * @returns {Promise<IActionSuccess | IActionError>}
 * Returns a promise that resolves to either a success object or an error object with error messages.
 *
 * @example
 * const result = await endMeeting({
 *   id_meeting: "0198e245-3fac-72a1-802d-5d3bfa164587",
 *   audio_file: audioFile
 * });
 * if (result.success) {
 *   // Handle success
 * } else {
 *   // Handle error, access result.error
 * }
 */
export const endMeeting = actionClient
  .inputSchema(endMeetingSchema)
  .action(async ({ parsedInput }): Promise<IActionSuccess | IActionError> => {
    try {
      const session = await auth();
      if (!session) {
        return {
          success: false,
          error: [APP_CONSTANTS.MESSAGE_AUTH_NO_ACTIVE_SESSION],
        };
      }

      // Create FormData for file upload
      const formData = new FormData();
      formData.append("audio_file", parsedInput.audio_file);

      const response = await axios.post(
        `${ENV.API_LOCAL_BASE_URL}meetings/${parsedInput.id_meeting}/end`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${session.token.access_token}`,
            "Content-Type": "multipart/form-data",
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
