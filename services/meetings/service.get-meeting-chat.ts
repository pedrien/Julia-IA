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
import { ListChatMeetingSchema } from "@/validators/meetings/validator.list-chat-meetings";
import { auth } from "@/auth";
import { z } from "zod";

/**
 * Fetches the chat messages for a specific meeting from the remote API.
 *
 * @function getMeetingChat
 * @param {string} meetingId - The ID of the meeting
 * @returns {Promise<(IActionSuccess & { data: ListChatMeetingSchema }) | IActionError>}
 *   An object indicating the success or failure of the operation, and the chat messages if successful.
 *
 * - Requires a valid user session (access token).
 * - Returns an error if the session is missing or expired.
 * - On HTTP request failure, returns an appropriate error message.
 * - On success, returns the meeting chat messages.
 *
 * Example usage:
 *   const result = await getMeetingChat("meeting-123");
 *   if (result.success) {
 *     // Access result.data
 *   } else {
 *     // Handle result.error
 *   }
 */
export const getMeetingChat = actionClient
  .inputSchema(
    z.object({
      meetingId: z.string(),
    })
  )
  .action(
    async ({
      parsedInput,
    }): Promise<
      (IActionSuccess & { data: ListChatMeetingSchema }) | IActionError
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
          `${ENV.API_LOCAL_BASE_URL}meetings/${parsedInput.meetingId}/chat`,
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

        const responseData: ListChatMeetingSchema = response.data.data;
        return { success: true, data: responseData };
      } catch (error) {
        return {
          success: false,
          error: handleServerActionError(error).error,
        };
      }
    }
  );
