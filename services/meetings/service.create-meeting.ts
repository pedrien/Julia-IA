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
import { createMeetingSchema } from "@/validators/meetings/validator.create-meeting";
import { auth } from "@/auth";

/**
 * Creates a new meeting by sending a POST request to the API.
 *
 * @function createMeeting
 * @description
 * This server action creates a new meeting using the provided input data.
 * It validates the input against the meeting creation schema, retrieves the current user session,
 * and sends a POST request to the meetings API endpoint. The function returns a success object
 * if the operation is successful, or an error object otherwise.
 *
 * @returns {Promise<IActionSuccess | IActionError>}
 * Returns a promise that resolves to either a success object or an error object with error messages.
 *
 * @example
 * const result = await createMeeting({
 *   title: "Réunion de test",
 *   description: "Description de la réunion de test",
 *   scheduled_start_time: "2025-08-26 10:00:00",
 *   end_time: "2025-08-26 11:00:00",
 *   location: "Salle de conférence A",
 *   participants_interne: ["0198e245-3fac-72a1-802d-5d3bfa164587"],
 *   participants_externe: ["0198e252-9d47-71ea-b424-efd5d8320766"]
 * });
 * if (result.success) {
 *   // Handle success
 * } else {
 *   // Handle error, access result.error
 * }
 */
export const createMeeting = actionClient
  .inputSchema(createMeetingSchema)
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
        `${ENV.API_LOCAL_BASE_URL}meetings/store`,
        parsedInput,
        {
          headers: {
            Authorization: `Bearer ${session.token.access_token}`,
          },
        }
      );

      if (response.status !== 201) {
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
