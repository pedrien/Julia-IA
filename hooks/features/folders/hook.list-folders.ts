"use client";

import { handleClientAuthError } from "@/libs/handleClientAuthError";
import { getListFolders } from "@/services/folders/service.list-folders";
import { ListFolderSchema } from "@/validators/folders/validator.list-folder";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getFoldersList = async (): Promise<ListFolderSchema | null> => {
  try {
    const response = await getListFolders();
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
 * Hook to fetch and manage the list of folders
 *
 * @returns {UseQueryResult<ListFolderSchema | null, Error>} Query result containing:
 * - data: The folders list if successful, null otherwise
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
export const useGetListFolders = (): UseQueryResult<
  ListFolderSchema | null,
  Error
> => {
  return useQuery<ListFolderSchema | null, Error>({
    queryKey: ["list-folders"],
    queryFn: () => getFoldersList(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
  });
};
