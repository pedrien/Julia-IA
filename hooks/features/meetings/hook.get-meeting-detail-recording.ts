"use client";

import { handleClientAuthError } from "@/libs/handleClientAuthError";
import { getMeetingDetailRecording } from "@/services/meetings/service.get-meeting-detail-recording";
import { MeetingRecordingDetail } from "@/validators/meetings/validator.meeting-recording-detail";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getMeetingDetailRecordingData = async (
  meetingId: string
): Promise<MeetingRecordingDetail | null> => {
  try {
    const response = await getMeetingDetailRecording({ meetingId });
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
 * Hook to fetch and manage the meeting detail recording data for a specific meeting
 *
 * @param {string} meetingId - The ID of the meeting
 * @returns {UseQueryResult<MeetingRecordingDetail | null, Error>} Query result containing:
 * - data: The meeting detail recording data if successful, null otherwise
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
export const useGetMeetingDetailRecording = (
  meetingId: string
): UseQueryResult<MeetingRecordingDetail | null, Error> => {
  return useQuery<MeetingRecordingDetail | null, Error>({
    queryKey: ["meeting-detail-recording", meetingId],
    queryFn: () => getMeetingDetailRecordingData(meetingId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!meetingId,
  });
};
