"use client";

import { handleClientAuthError } from "@/libs/handleClientAuthError";
import { getListMeetings } from "@/services/meetings/service.list-meetings";
import { ListMeetings } from "@/validators/meetings/validator.list-meeting";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getMeetingsList = async (): Promise<ListMeetings | null> => {
  try {
    const response = await getListMeetings();
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
 * Hook to fetch and manage the list of meetings
 *
 * @returns {UseQueryResult<ListMeetings | null, Error>} Query result containing:
 * - data: The meetings list if successful, null otherwise
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
export const useGetListMeetings = (): UseQueryResult<
  ListMeetings | null,
  Error
> => {
  return useQuery<ListMeetings | null, Error>({
    queryKey: ["list-meetings"],
    queryFn: () => getMeetingsList(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
  });
};
