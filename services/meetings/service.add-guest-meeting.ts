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
  addGuestMeetingSchema,
  AddGuestMeetingSchema,
} from "@/validators/meetings/validator.add-guest-meeting";
import { auth } from "@/auth";
import { z } from "zod";

/**
 * Adds a guest participant to a specific meeting.
 *
 * @function addGuestMeeting
 * @param {string} meetingId - The ID of the meeting
 * @param {string} type - Participant type (EXTERNAL, INTERNAL, etc.)
 * @param {string} external_name - Guest name
 * @param {string} external_email - Guest email
 * @param {string} external_phone - Guest phone
 * @param {string} [external_company] - Guest company (optional)
 * @returns {Promise<(IActionSuccess & { data: AddGuestMeetingSchema }) | IActionError>}
 *   An object indicating the success or failure of the operation, and the guest data if successful.
 *
 * - Requires a valid user session (access token).
 * - Returns an error if the session is missing or expired.
 * - On HTTP request failure, returns an appropriate error message.
 * - On success, returns the added guest participant data.
 *
 * Example usage:
 *   const result = await addGuestMeeting({
 *     meetingId: "meeting-123",
 *     type: "EXTERNAL",
 *     external_name: "John Doe",
 *     external_email: "john@example.com",
 *     external_phone: "+1234567890",
 *     external_company: "Acme Corp"
 *   });
 *   if (result.success) {
 *     // Access result.data
 *   } else {
 *     // Handle result.error
 *   }
 */
export const addGuestMeeting = actionClient
  .inputSchema(addGuestMeetingSchema)
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
        `${ENV.API_LOCAL_BASE_URL}meetings/${parsedInput.meetingId}/add-guest`,
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
