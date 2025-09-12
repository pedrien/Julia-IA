"use server";

import { APP_CONSTANTS } from "@/constants/appConstants";
import { ENV } from "@/env";
import {
  IActionError,
  IActionSuccess,
} from "@/interfaces/interface.result-actions";
import { handleServerActionError } from "@/libs/handleServerActionError";
import { actionClient } from "@/libs/safeAction";
import { fetchPdfRequestSchema } from "@/validators/meetings/validator.fetch-pdf";
import { auth } from "@/auth";

/**
 * Récupère un fichier PDF depuis une URL via l'API proxy.
 *
 * @function fetchPdfFile
 * @description
 * Cette server action récupère un fichier PDF depuis une URL externe en utilisant
 * l'API route proxy pour éviter les problèmes CORS. Elle valide l'URL d'entrée,
 * récupère la session utilisateur, et envoie une requête GET à l'endpoint PDF de l'API.
 * La fonction retourne un objet de succès avec l'ArrayBuffer du PDF si l'opération
 * est réussie, ou un objet d'erreur sinon.
 *
 * @returns {Promise<IActionSuccess & { data: ArrayBuffer } | IActionError>}
 * Retourne une promesse qui se résout soit en objet de succès avec les données PDF,
 * soit en objet d'erreur avec les messages d'erreur.
 *
 * @example
 * const result = await fetchPdfFile({
 *   url: "https://example.com/document.pdf"
 * });
 * if (result.success) {
 *   // Gérer le succès, accéder à result.data (ArrayBuffer)
 * } else {
 *   // Gérer l'erreur, accéder à result.error
 * }
 */
export const fetchPdfFile = actionClient
  .inputSchema(fetchPdfRequestSchema)
  .action(
    async ({
      parsedInput,
    }): Promise<(IActionSuccess & { data: ArrayBuffer }) | IActionError> => {
      try {
        const session = await auth();
        if (!session) {
          return {
            success: false,
            error: [APP_CONSTANTS.MESSAGE_AUTH_NO_ACTIVE_SESSION],
          };
        }

        // Construction de l'URL de l'API
        const apiUrl = `${
          ENV.API_LOCAL_BASE_URL
        }load-pdf?url=${encodeURIComponent(parsedInput.url)}`;

        // Appel à l'API pour récupérer le PDF
        const response = await fetch(apiUrl, {
          method: "GET",
          headers: {
            Accept: "application/pdf",
            Authorization: `Bearer ${session.token.access_token}`,
          },
        });

        if (!response.ok) {
          return {
            success: false,
            error: [
              `Erreur lors de la récupération du PDF: ${response.statusText}`,
            ],
          };
        }

        // Conversion en ArrayBuffer
        const arrayBuffer = await response.arrayBuffer();

        if (!arrayBuffer || arrayBuffer.byteLength === 0) {
          return {
            success: false,
            error: ["Le fichier PDF récupéré est vide"],
          };
        }

        return { success: true, data: arrayBuffer };
      } catch (error) {
        return { success: false, error: handleServerActionError(error).error };
      }
    }
  );
