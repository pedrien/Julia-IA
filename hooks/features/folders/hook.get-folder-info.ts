"use client";

import { handleClientAuthError } from "@/libs/handleClientAuthError";
import { getFolderInfo } from "@/services/folders/service.get-folder-info";
import { InfoFolderSchema } from "@/validators/folders/validator.info-folder";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getFolderInfoData = async (
  folderId: string
): Promise<InfoFolderSchema | null> => {
  try {
    const response = await getFolderInfo({ folderId });
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
 * Hook to fetch and manage detailed information for a specific folder
 *
 * @param {string} folderId - The ID of the folder
 * @returns {UseQueryResult<InfoFolderSchema | null, Error>} Query result containing:
 * - data: The folder information if successful, null otherwise
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
export const useGetFolderInfo = (
  folderId: string
): UseQueryResult<InfoFolderSchema | null, Error> => {
  return useQuery<InfoFolderSchema | null, Error>({
    queryKey: ["folder-info", folderId],
    queryFn: () => getFolderInfoData(folderId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!folderId,
  });
};
