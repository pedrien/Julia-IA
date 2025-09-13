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
import { AskAiMeetingSchema } from "@/validators/meetings/validator.ask-ai-meeting";
import { auth } from "@/auth";
import { z } from "zod";

/**
 * Sends a question to the AI about a specific meeting and returns the AI's response.
 *
 * @function askAiMeeting
 * @param {string} meetingId - The ID of the meeting
 * @param {string} message - The question to ask the AI
 * @returns {Promise<(IActionSuccess & { data: AskAiMeetingSchema }) | IActionError>}
 *   An object indicating the success or failure of the operation, and the AI response if successful.
 *
 * - Requires a valid user session (access token).
 * - Returns an error if the session is missing or expired.
 * - On HTTP request failure, returns an appropriate error message.
 * - On success, returns the AI's response to the question.
 *
 * Example usage:
 *   const result = await askAiMeeting("meeting-123", "What were the key decisions?");
 *   if (result.success) {
 *     // Access result.data
 *   } else {
 *     // Handle result.error
 *   }
 */
export const askAiMeeting = actionClient
  .inputSchema(
    z.object({
      meetingId: z.string(),
      message: z.string().min(1, "Message cannot be empty"),
    })
  )
  .action(
    async ({
      parsedInput,
    }): Promise<
      (IActionSuccess & { data: AskAiMeetingSchema }) | IActionError
    > => {
      try {
        const session = await auth();
        if (!session) {
          return {
            success: false,
            error: [APP_CONSTANTS.MESSAGE_AUTH_NO_ACTIVE_SESSION],
          };
        }

        const response = await axios.post(
          `${ENV.API_LOCAL_BASE_URL}meetings/${parsedInput.meetingId}/ask-ai`,
          { message: parsedInput.message },
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

        const responseData: AskAiMeetingSchema = response.data.data;
        return { success: true, data: responseData };
      } catch (error) {
        return {
          success: false,
          error: handleServerActionError(error).error,
        };
      }
    }
  );
