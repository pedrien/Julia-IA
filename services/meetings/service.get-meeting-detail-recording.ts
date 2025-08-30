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
import { MeetingRecordingDetail } from "@/validators/meetings/validator.meeting-recording-detail";
import { auth } from "@/auth";
import { z } from "zod";
const inputSchema = z.object({
  id: z.string(),
});

/**
 * Fetches meeting details from the remote API.
 *
 * @function getMeetingDetail
 * @param {string} meetingId - The ID of the meeting to fetch
 * @returns {Promise<(IActionSuccess & { data: MeetingRecordingDetail }) | IActionError>}
 *   An object indicating the success or failure of the operation, and the meeting details if successful.
 *
 * - Requires a valid user session (access token).
 * - Returns an error if the session is missing or expired.
 * - On HTTP request failure, returns an appropriate error message.
 * - On success, returns the meeting details with participants.
 *
 * Example usage:
 *   const result = await getMeetingDetail("123");
 *   if (result.success) {
 *     // Access result.data
 *   } else {
 *     // Handle result.error
 *   }
 */
export const getMeetingDetailRecording = actionClient
  .inputSchema(inputSchema)
  .action(
    async ({
      parsedInput,
    }: {
      parsedInput: { id: string };
    }): Promise<
      (IActionSuccess & { data: MeetingRecordingDetail }) | IActionError
    > => {
      try {
        const session = await auth();
        if (!session) {
          return {
            success: false,
            error: [APP_CONSTANTS.MESSAGE_AUTH_NO_ACTIVE_SESSION],
          };
        }

        if (!parsedInput.id) {
          return {
            success: false,
            error: ["ID de réunion requis"],
          };
        }

        const response = await axios.get(
          `${ENV.API_LOCAL_BASE_URL}meetings/${parsedInput.id}/recording-detail`,
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

        const responseData: MeetingRecordingDetail = response.data.data;
        return { success: true, data: responseData };
      } catch (error) {
        return {
          success: false,
          error: handleServerActionError(error).error,
        };
      }
    }
  );
