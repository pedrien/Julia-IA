"use client";

import { handleClientAuthError } from "@/libs/handleClientAuthError";
import { getFolderSummary } from "@/services/folders/service.get-folder-summary";
import { SummaryFolderSchema } from "@/validators/folders/validator.summary-folder";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getFolderSummaryData = async (
  folderId: string
): Promise<SummaryFolderSchema | null> => {
  try {
    const response = await getFolderSummary(folderId);
    if (response?.data?.success === false) {
      handleClientAuthError(response.data.error, false);
      throw new Error(response.data.error.join(", "));
    } else {
      const data = response?.data?.data || null;

      return data;
    }
  } catch (error) {
    throw error;
  }
};

/**
 * Hook to fetch and manage the summary for a specific folder
 *
 * @param {string} folderId - The ID of the folder
 * @returns {UseQueryResult<SummaryFolderSchema | null, Error>} Query result containing:
 * - data: The folder summary if successful, null otherwise
 * - error: Error object if the query failed
 * - isLoading: Boolean indicating if the query is in progress (only for initial load)
 * - isFetching: Boolean indicating if any fetch is in progress
 * - isError: Boolean indicating if the query resulted in an error
 * - refetch: Function to manually refetch the data
 *
 * The query will:
 * - Cache results for 5 minutes (staleTime)
 * - Retry failed requests twice
 * - Refetch on window focus
 */
export const useGetFolderSummary = (
  folderId: string
): UseQueryResult<SummaryFolderSchema | null, Error> => {
  return useQuery<SummaryFolderSchema | null, Error>({
    queryKey: ["folder-summary", folderId],
    queryFn: () => getFolderSummaryData(folderId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!folderId,
  });
};
