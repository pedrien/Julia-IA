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
import { createParticipantSchema } from "@/validators/participants/validator.create-participant";
import { auth } from "@/auth";

/**
 * Creates a new participant by sending a POST request to the API.
 *
 * @function createParticipant
 * @description
 * This server action creates a new participant using the provided input data.
 * It validates the input against the participant creation schema, retrieves the current user session,
 * and sends a POST request to the participants API endpoint. The function returns a success object
 * with the created participant data if the operation is successful, or an error object otherwise.
 *
 * @returns {Promise<(IActionSuccess & { data: CreateParticipantResponse }) | IActionError>}
 * Returns a promise that resolves to either a success object containing the created participant data,
 * or an error object with error messages.
 *
 * @example
 * const result = await createParticipant({
 *   type: "EXTERNE",
 *   external_name: "John Doe",
 *   external_email: "john@example.com",
 *   external_phone: "+243825698895",
 *   external_company: "Mizaroo"
 * });
 * if (result.success) {
 *   // Handle success, access result.data
 * } else {
 *   // Handle error, access result.error
 * }
 */
export const createParticipant = actionClient
  .inputSchema(createParticipantSchema)
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
        `${ENV.API_LOCAL_BASE_URL}participants/create`,
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
