"use client";

import { handleClientAuthError } from "@/libs/handleClientAuthError";
import { getListParticipants } from "@/services/participants/service.list-participants";
import { ListParticipants } from "@/validators/participants/validator.list-participants";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getParticipantsList = async (): Promise<ListParticipants | null> => {
  try {
    const response = await getListParticipants();
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
 * Hook to fetch and manage the list of participants
 *
 * @returns {UseQueryResult<ListParticipants | null, Error>} Query result containing:
 * - data: The participants list if successful, null otherwise
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
export const useGetListParticipants = (): UseQueryResult<
  ListParticipants | null,
  Error
> => {
  return useQuery<ListParticipants | null, Error>({
    queryKey: ["list-participants"],
    queryFn: () => getParticipantsList(),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
  });
};
