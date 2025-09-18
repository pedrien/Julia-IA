"use client";

import { handleClientAuthError } from "@/libs/handleClientAuthError";
import { getMeetingDetail } from "@/services/meetings/service.get-meeting-detail";
import { DetailMeeting } from "@/validators/meetings/validator.detail-meetings";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getMeetingDetails = async (
  meetingId: string
): Promise<DetailMeeting | null> => {
  try {
    const response = await getMeetingDetail({ meetingId });
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
 * Hook to fetch and manage the details for a specific meeting
 *
 * @param {string} meetingId - The ID of the meeting
 * @returns {UseQueryResult<DetailMeeting | null, Error>} Query result containing:
 * - data: The meeting details if successful, null otherwise
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
export const useGetMeetingDetail = (
  meetingId: string
): UseQueryResult<DetailMeeting | null, Error> => {
  return useQuery<DetailMeeting | null, Error>({
    queryKey: ["meeting-detail", meetingId],
    queryFn: () => getMeetingDetails(meetingId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!meetingId,
  });
};
