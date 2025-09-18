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
import { sharingMeetingParticipantSchema } from "@/validators/meetings/validator.sharing-meeting";
import { auth } from "@/auth";

/**
 * Shares a meeting with internal and external participants by sending a POST request to the API.
 *
 * @function shareMeeting
 * @description
 * This server action shares a meeting using the provided input data.
 * It validates the input against the sharing meeting schema, retrieves the current user session,
 * and sends a POST request to the meetings share API endpoint. The function returns a success object
 * if the operation is successful, or an error object otherwise.
 *
 * @returns {Promise<IActionSuccess | IActionError>}
 * Returns a promise that resolves to either a success object or an error object with error messages.
 *
 * @example
 * const result = await shareMeeting({
 *   meeting_id: "0198e245-3fac-72a1-802d-5d3bfa164587",
 *   external_participant: ["user1@example.com", "user2@example.com"],
 *   internal_participant: ["0198e252-9d47-71ea-b424-efd5d8320766"]
 * });
 * if (result.success) {
 *   // Handle success
 * } else {
 *   // Handle error, access result.error
 * }
 */
export const shareMeeting = actionClient
  .inputSchema(sharingMeetingParticipantSchema)
  .action(
    async ({
      parsedInput,
    }): Promise<
      | (IActionSuccess & { data: { shared: boolean; meeting_id: string } })
      | IActionError
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
          `${ENV.API_LOCAL_BASE_URL}meetings/share`,
          parsedInput,
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

        return { success: true, data: response.data.data };
      } catch (error) {
        return { success: false, error: handleServerActionError(error).error };
      }
    }
  );
