"use client";

import { handleClientAuthError } from "@/libs/handleClientAuthError";
import { getMeetingParticipants } from "@/services/meetings/service.get-meeting-participants";
import { MeetingParticipantList } from "@/validators/meetings/validator.detail-meetings";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getParticipantsList = async (
  meetingId: string
): Promise<MeetingParticipantList | null> => {
  try {
    const response = await getMeetingParticipants({ meetingId });
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
 * Hook to fetch and manage the list of participants for a specific meeting
 *
 * @param {string} meetingId - The ID of the meeting
 * @returns {UseQueryResult<MeetingParticipantList | null, Error>} Query result containing:
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
 * - Only run when meetingId is provided
 */
export const useGetMeetingParticipants = (
  meetingId: string
): UseQueryResult<MeetingParticipantList | null, Error> => {
  return useQuery<MeetingParticipantList | null, Error>({
    queryKey: ["meeting-participants", meetingId],
    queryFn: () => getParticipantsList(meetingId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!meetingId,
  });
};
