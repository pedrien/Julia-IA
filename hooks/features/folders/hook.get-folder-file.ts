"use client";

import { handleClientAuthError } from "@/libs/handleClientAuthError";
import { getFolderFile } from "@/services/folders/service.get-folder-file";
import { FileFolderSchema } from "@/validators/folders/validator.file-folder";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getFolderFileData = async (
  folderId: string
): Promise<FileFolderSchema | null> => {
  try {
    const response = await getFolderFile(folderId);
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
 * Hook to fetch and manage the file URL for a specific folder
 *
 * @param {string} folderId - The ID of the folder
 * @returns {UseQueryResult<FileFolderSchema | null, Error>} Query result containing:
 * - data: The folder file data if successful, null otherwise
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
export const useGetFolderFile = (
  folderId: string
): UseQueryResult<FileFolderSchema | null, Error> => {
  return useQuery<FileFolderSchema | null, Error>({
    queryKey: ["folder-file", folderId],
    queryFn: () => getFolderFileData(folderId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!folderId,
  });
};
