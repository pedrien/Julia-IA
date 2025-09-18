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
import { generateTranscriptionSchema } from "@/validators/meetings/validator.generate-transcription";
import { auth } from "@/auth";

/**
 * Génère une transcription pour une réunion en envoyant une requête GET à l'API.
 *
 * @function generateTranscription
 * @description
 * Cette server action génère une transcription pour une réunion spécifiée.
 * Elle valide l'ID de la réunion, récupère la session utilisateur actuelle,
 * et envoie une requête GET à l'endpoint de génération de transcription de l'API.
 * La fonction retourne un objet de succès si l'opération réussit, ou un objet d'erreur sinon.
 *
 * @returns {Promise<IActionSuccess | IActionError>}
 * Retourne une promesse qui se résout en un objet de succès ou un objet d'erreur avec des messages d'erreur.
 *
 * @example
 * const result = await generateTranscription({ id: "0198e245-3fac-72a1-802d-5d3bfa164587" });
 * if (result.success) {
 *   // Transcription générée avec succès
 * } else {
 *   // Gérer l'erreur, accéder à result.error
 * }
 */
export const generateTranscription = actionClient
  .inputSchema(generateTranscriptionSchema)
  .action(
    async ({ parsedInput: { id } }): Promise<IActionSuccess | IActionError> => {
      try {
        const session = await auth();
        if (!session) {
          return {
            success: false,
            error: [APP_CONSTANTS.MESSAGE_AUTH_NO_ACTIVE_SESSION],
          };
        }

        const response = await axios.get(
          `${ENV.API_LOCAL_BASE_URL}meetings/${id}/generate-transcription`,
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
                "Il semble y avoir une erreur lors de la génération de la transcription.",
            ],
          };
        }

        return {
          success: true,
        };
      } catch (error) {
        return { success: false, error: handleServerActionError(error).error };
      }
    }
  );
