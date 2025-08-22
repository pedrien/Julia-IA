import { addToast } from "@heroui/react";
import { handleClientAuthError } from "./handleClientAuthError";

export interface ServerResponse {
  data?: {
    success?: boolean;
    error?: unknown;
    [key: string]: unknown;
  };
  validationErrors?: {
    [key: string]: string[] | { _errors: string[] };
  };
}

interface ResponseHandlerOptions {
  onSuccess?: (data?: unknown) => void;
  onError?: (error: unknown) => void;
  onValidationError?: (errors: { [key: string]: string[] }) => void;
  successMessage?: string;
  errorMessage?: string;
  cleanUp?: () => Promise<void> | void;
  showSuccessMessage?: boolean;
}

/**
 * Handles the server response and executes appropriate callbacks based on the response status.
 *
 * @param {ServerResponse} response - The response object from the server.
 * @param {ResponseHandlerOptions} [options={}] - Optional configuration for handling the response.
 * @param {Function} [options.onSuccess] - Callback function to execute on successful response.
 * @param {Function} [options.onError] - Callback function to execute on error response.
 * @param {Function} [options.onValidationError] - Callback function to execute on validation error response.
 * @param {string} [options.successMessage="Opération réussie !"] - Custom success message to display.
 * @param {string} [options.errorMessage="Une erreur est survenue. Veuillez réessayer plus tard."] - Custom error message to display.
 * @param {Function} [options.cleanUp] - Cleanup function to execute after handling the response.
 *
 * @returns {Promise<void>} A promise that resolves when the response handling is complete.
 */
export async function handleServerResponse(
  response: ServerResponse,
  options: ResponseHandlerOptions = {},
  showSuccessMessage = false
): Promise<void> {
  const {
    onSuccess,
    onError,
    onValidationError,
    successMessage = "Opération réussie !",
    errorMessage = "Une erreur est survenue. Veuillez réessayer plus tard.",
    cleanUp,
  } = options;

  if (response?.data?.success === false) {
    if (cleanUp) {
      await cleanUp();
    }
    if (onError) {
      onError(response.data.error);
      handleClientAuthError(response.data.error as string[]);
    } else {
      handleClientAuthError(response.data.error as string[]);
    }
  } else if (response?.data?.success) {
    if (onSuccess) {
      onSuccess(response.data);
      if (showSuccessMessage === true) {
        addToast({
          title: "Opération réussie !",
          description: successMessage,
          color: "success",
        });
      }
    }
  } else if (response?.validationErrors) {
    const errors: { [key: string]: string[] } = {};

    Object.keys(response.validationErrors).forEach((field) => {
      const fieldErrors = response.validationErrors?.[field];
      if (Array.isArray(fieldErrors)) {
        errors[field] = fieldErrors;
      } else if (fieldErrors?._errors) {
        errors[field] = fieldErrors._errors;
      }
    });

    if (onValidationError && process.env.NODE_ENV === "development") {
      onValidationError(errors);
    }
  } else {
    if (cleanUp) {
      await cleanUp();
    }

    addToast({
      title: "Erreur !",
      description: errorMessage,
      color: "danger",
    });
    if (onError) {
      onError(new Error("Erreur inconnue"));
    }
  }
}
