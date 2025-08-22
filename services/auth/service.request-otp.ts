"use server";

import { ENV } from "@/env";
import {
  IActionError,
  IActionSuccess,
} from "@/interfaces/interface.result-actions";
import { handleServerActionError } from "@/libs/handleServerActionError";
import { actionClient } from "@/libs/safeAction";
import axios from "axios";
import { z } from "zod";
import { ListAppartementsResponse } from "@/validators/appartements/validator.list-appartements";

/**
 * Fetches a paginated list of apartments from the remote API.
 *
 * @function getListAppartements
 * @param {Object} input - The input parameters for fetching apartments.
 * @param {number} input.page - The page number to retrieve (must be >= 1).
 * @returns {Promise<(IActionSuccess & { data: ListAppartementsResponse }) | IActionError>}
 *   An object indicating the success or failure of the operation, and the apartments list data if successful.
 *
 * - Requires a valid user session (access token).
 * - Returns an error if the session is missing or expired.
 * - On HTTP request failure, returns an appropriate error message.
 * - On success, returns the paginated list of apartments.
 *
 * Example usage:
 *   const result = await getListAppartements({ page: 1 });
 *   if (result.success) {
 *     // Access result.data
 *   } else {
 *     // Handle result.error
 *   }
 */
export const getListAppartements = actionClient
  .inputSchema(
    z.object({
      page: z
        .number()
        .min(1, "La page doit être un nombre entier supérieur à 0"),
    })
  )
  .action(
    async ({
      parsedInput: { page },
    }): Promise<
      (IActionSuccess & { data: ListAppartementsResponse }) | IActionError
    > => {
      try {
        const response = await axios.get(
          `${ENV.API_LOCAL_BASE_URL}appartements/all?page=${page}`
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

        const responseData: ListAppartementsResponse = response.data.data;
        return { success: true, data: responseData };
      } catch (error) {
        return {
          success: false,
          error: handleServerActionError(error).error,
        };
      }
    }
  );
