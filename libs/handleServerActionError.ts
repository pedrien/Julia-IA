import axios from "axios";
import { ZodError } from "zod";

const DEFAULT_VALIDATION_ERROR =
  "Il semble y avoir une erreur dans les informations que vous avez fournies. Un petit coup d'œil et ça devrait être bon ! 🔍";
const DEFAULT_SERVICE_UNAVAILABLE =
  "Oups ! Le service met plus de temps que prévu pour répondre. Veuillez patienter un instant ou actualisez la page pour vérifier.";
const DEFAULT_INTERNAL_ERROR =
  "Une erreur interne est survenue. Nos développeurs sont déjà au travail ! 🚧";
const DEFAULT_TIMEOUT_ERROR =
  "Le service met un peu trop de temps à répondre... Réessayez dans un moment.";
const DEFAULT_UNKNOWN_ERROR =
  "Oups ! Quelque chose s'est mal passé. Nous essayons de réparer ça... Promis ! 🛠️";
const DEFAULT_TRY_LATER_ERROR =
  "Une erreur interne est survenue. Veuillez réessayer plus tard. 🤖";

/**
 * Handles errors from server actions and returns a standardized error object.
 * @param error - The error to handle
 * @returns An object with an array of error messages
 */
export const handleServerActionError = (
  error: unknown
): { error: string[] } => {
  // Handle Axios errors
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.response.status === 422) {
        const errors = error.response.data.error?.errors;
        const errorMessages = errors
          ? Object.values(errors)
              .flat()
              .map((msg) => msg)
          : [error.response.data.error?.message || DEFAULT_VALIDATION_ERROR];
        return { error: errorMessages };
      }
      if (error.response.status === 503) {
        return { error: [DEFAULT_SERVICE_UNAVAILABLE] };
      }
      return {
        error: [
          error.response.data.error ||
            error.response.data.error?.message ||
            DEFAULT_INTERNAL_ERROR,
        ],
      };
    }
    if (error.request) {
      return { error: [DEFAULT_TIMEOUT_ERROR] };
    }
    return { error: [DEFAULT_TRY_LATER_ERROR] };
  }
  // Handle Zod validation errors
  if (error instanceof ZodError) {
    return { error: [`Erreur de validation : ${error.message}`] };
  }
  // Handle general Error instances
  if (error instanceof Error) {
    return { error: [error.message] };
  }
  // Handle unknown errors
  return { error: [DEFAULT_UNKNOWN_ERROR] };
};
