"use client";

import { handleClientAuthError } from "@/libs/handleClientAuthError";
import { getFolderReviews } from "@/services/folders/service.get-folder-reviews";
import { ListReviewFolderSchema } from "@/validators/folders/validator.review-folder";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getFolderReviewsData = async (
  folderId: string
): Promise<ListReviewFolderSchema | null> => {
  try {
    const response = await getFolderReviews(folderId);
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
 * Hook to fetch and manage all reviews for a specific folder
 *
 * @param {string} folderId - The ID of the folder
 * @returns {UseQueryResult<ListReviewFolderSchema | null, Error>} Query result containing:
 * - data: The folder reviews if successful, null otherwise
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
export const useGetFolderReviews = (
  folderId: string
): UseQueryResult<ListReviewFolderSchema | null, Error> => {
  return useQuery<ListReviewFolderSchema | null, Error>({
    queryKey: ["folder-reviews", folderId],
    queryFn: () => getFolderReviewsData(folderId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!folderId,
  });
};
