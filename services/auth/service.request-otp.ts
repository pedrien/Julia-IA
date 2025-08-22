"use server";

import { ENV } from "@/env";
import { handleServerActionError } from "@/libs/handleServerActionError";
import { actionClient } from "@/libs/safeAction";
import axios from "axios";
import shemaRequestOtp from "@/validators/auth/validator.request-otp";

/**
 * Requests an OTP (One-Time Password) for user authentication.
 *
 * @function requestOtp
 * @param {Object} input - The input parameters for requesting OTP.
 * @param {string} input.username - The username to send OTP to.
 * @returns {Promise<{ success: boolean; message?: string; error?: string }>}
 *   An object indicating the success or failure of the operation.
 *
 * - Sends a request to the API to generate and send an OTP.
 * - Returns an error if the username is invalid or if the API call fails.
 * - On success, returns a confirmation message.
 *
 * Example usage:
 *   const result = await requestOtp({ username: "john_doe" });
 *   if (result.success) {
 *     // OTP sent successfully
 *   } else {
 *     // Handle result.error
 *   }
 */
export const requestOtp = actionClient
  .inputSchema(shemaRequestOtp)
  .action(
    async ({
      parsedInput: { username },
    }): Promise<{ success: boolean; message?: string; error?: string }> => {
      try {
        const response = await axios.post(
          `${ENV.API_LOCAL_BASE_URL}auth/request-otp`,
          {
            username,
          }
        );

        if (response.status !== 200) {
          const errorResponse = response.data?.error || "Unknown error";
          return {
            success: false,
            error:
              errorResponse ||
              "Il semble y avoir une erreur avec les informations fournies.",
          };
        }

        return {
          success: true,
          message: "Un code de vérification a été envoyé avec succès.",
        };
      } catch (error) {
        const errorResult = handleServerActionError(error);
        return {
          success: false,
          error:
            errorResult.error[0] || "Une erreur inattendue s'est produite.",
        };
      }
    }
  );
