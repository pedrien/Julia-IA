"use client";

import {
  useMutation,
  useQueryClient,
  UseMutationOptions,
} from "@tanstack/react-query";
import { showToast } from "@/utils/utils.toast";
import { handleServerResponse } from "@/libs/responseHandler";
import { useLoading } from "@/contexts/Overlay/LoadingContext";

// Types pour les réponses d'API
export interface ApiResponse<T = unknown> {
  data?: {
    success?: boolean;
    [key: string]: unknown;
  };
  validationErrors?: Record<string, { _errors?: string[] }>;
}

// Types pour les erreurs
export type ApiError = string | string[] | Error | unknown;

// Types pour les actions server
export interface IActionSuccess {
  success: true;
  data?: unknown;
}

export interface IActionError {
  success: false;
  error: string[];
}

export type ServerActionResult = IActionSuccess | IActionError;

// Type union pour supporter à la fois les réponses API et les actions server
export type MutationResult<T> =
  | ApiResponse<T>
  | ServerActionResult
  | {
      success?: boolean;
      error?: unknown;
      data?: unknown;
      [key: string]: unknown;
    };

export interface MutationConfig<TData, TVariables> {
  // Configuration de la mutation
  mutationFn: (variables: TVariables) => Promise<MutationResult<TData>>;

  // Messages personnalisables
  messages: {
    success?: string;
    error?: string;
    validationError?: string;
    loading?: string;
  };

  // Clés de requête à invalider après succès
  // Supporte les clés simples ou avec paramètres dynamiques
  invalidateQueries?: (string | [string, ...unknown[]])[];

  // Actions personnalisées
  onSuccess?: (
    data: MutationResult<TData>,
    variables: TVariables
  ) => void | Promise<void>;
  onError?: (error: ApiError, variables: TVariables) => void;
  onValidationError?: (errors: Record<string, string[]>) => void;

  // Configuration du loading
  useLoading?: boolean;

  // Options de mutation personnalisées
  mutationOptions?: Omit<
    UseMutationOptions<MutationResult<TData>, ApiError, TVariables>,
    "mutationFn"
  >;
}

export interface UseMutationResult<TData, TVariables> {
  mutate: (variables: TVariables) => void;
  mutateAsync: (variables: TVariables) => Promise<MutationResult<TData>>;
  isPending: boolean;
  error: ApiError | null;
  reset: () => void;
  data: MutationResult<TData> | undefined;
}

/**
 * Hook réutilisable pour toutes les mutations
 */
export const useCustomMutation = <TData = unknown, TVariables = unknown>(
  config: MutationConfig<TData, TVariables>
): UseMutationResult<TData, TVariables> => {
  const queryClient = useQueryClient();
  const { startLoading, stopLoading } = useLoading();

  const {
    mutationFn,
    messages,
    invalidateQueries = [],
    onSuccess,
    onError,
    onValidationError,
    useLoading: shouldUseLoading = true,
    mutationOptions = {},
  } = config;

  const mutation = useMutation({
    mutationFn: async (variables: TVariables) => {
      if (shouldUseLoading) {
        startLoading();
      }
      return await mutationFn(variables);
    },
    onSuccess: async (response, variables) => {
      // Vérifier si c'est une action server ou une réponse API
      // Utiliser une approche plus flexible pour la détection
      const isServerAction =
        response &&
        typeof response === "object" &&
        "success" in response &&
        typeof response.success === "boolean";

      if (isServerAction) {
        // C'est une action server (IActionSuccess | IActionError)
        if (response.success) {
          // Succès
          if (messages.success) {
            showToast({
              title: "Succès",
              description: messages.success,
              color: "success",
            });
          }

          // Invalider les requêtes spécifiées
          invalidateQueries.forEach((queryKey) => {
            if (Array.isArray(queryKey)) {
              // Clé avec paramètres dynamiques: ["product-details", id]
              queryClient.invalidateQueries({
                queryKey: queryKey,
              });
            } else {
              // Clé simple: "products-list"
              queryClient.invalidateQueries({
                queryKey: [queryKey],
              });
            }
          });

          // Action personnalisée de succès
          if (onSuccess) {
            await onSuccess(response, variables);
          }
        } else {
          // Erreur d'action server
          const errorMessage =
            response.error && Array.isArray(response.error)
              ? response.error.join(", ")
              : "Une erreur s'est produite";

          showToast({
            title: "Erreur",
            description: errorMessage,
            color: "danger",
          });
        }
      } else {
        // C'est une réponse API classique, utiliser handleServerResponse
        const apiResponse = response as ApiResponse<TData>;
        const res = {
          data: {
            success: apiResponse?.data?.success,
            ...apiResponse?.data,
          },
          validationErrors: apiResponse?.validationErrors
            ? Object.keys(apiResponse.validationErrors).reduce((acc, key) => {
                acc[key] =
                  (
                    apiResponse.validationErrors as Record<
                      string,
                      { _errors?: string[] }
                    >
                  )[key]?._errors || [];
                return acc;
              }, {} as { [key: string]: string[] })
            : undefined,
        };

        handleServerResponse(res, {
          onSuccess: async () => {
            // Message de succès
            if (messages.success) {
              showToast({
                title: "Succès",
                description: messages.success,
                color: "success",
              });
            }

            // Invalider les requêtes spécifiées
            invalidateQueries.forEach((queryKey) => {
              if (Array.isArray(queryKey)) {
                // Clé avec paramètres dynamiques: ["product-details", id]
                queryClient.invalidateQueries({
                  queryKey: queryKey,
                });
              } else {
                // Clé simple: "products-list"
                queryClient.invalidateQueries({
                  queryKey: [queryKey],
                });
              }
            });

            // Action personnalisée de succès
            if (onSuccess) {
              await onSuccess(response, variables);
            }
          },
          onValidationError: (errors) => {
            // Gestion des erreurs de validation
            if (onValidationError) {
              onValidationError(errors);
            } else {
              // Comportement par défaut
              Object.entries(errors).forEach(([field, errorMessages]) => {
                errorMessages.forEach((error) => {
                  showToast({
                    title: "Erreur de validation",
                    description: `${field}: ${error}`,
                    color: "danger",
                  });
                });
              });
            }
          },
          cleanUp() {
            if (shouldUseLoading) {
              stopLoading();
            }
          },
          onError: (error) => {
            // Gestion des erreurs
            if (onError) {
              onError(error, variables);
            } else {
              // Comportement par défaut
              if (Array.isArray(error)) {
                error.forEach((errorMessage) => {
                  showToast({
                    title: "Erreur",
                    description: errorMessage,
                    color: "danger",
                  });
                });
              } else {
                showToast({
                  title: "Erreur",
                  description: error as string,
                  color: "danger",
                });
              }
            }
          },
          errorMessage:
            messages.error ||
            "Une erreur s'est produite. Veuillez réessayer plus tard.",
        });
      }

      if (shouldUseLoading) {
        stopLoading();
      }
    },
    onError: (error, variables) => {
      console.error("Erreur de mutation:", error);

      // Gestion des erreurs de mutation
      if (onError) {
        onError(error, variables);
      } else {
        // Comportement par défaut
        showToast({
          title: "Erreur",
          description: messages.error || "Une erreur s'est produite",
          color: "danger",
        });
      }

      if (shouldUseLoading) {
        stopLoading();
      }
    },
    ...mutationOptions,
  });

  return {
    mutate: mutation.mutate,
    mutateAsync: mutation.mutateAsync,
    isPending: mutation.isPending,
    error: mutation.error,
    reset: mutation.reset,
    data: mutation.data,
  };
};
