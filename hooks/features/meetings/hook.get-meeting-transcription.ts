"use client";

import { handleClientAuthError } from "@/libs/handleClientAuthError";
import { getMeetingTranscription } from "@/services/meetings/service.get-meeting-transcription";
import { MeetingTranscriptText } from "@/validators/meetings/validator.detail-meetings";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getTranscriptionText = async (
  meetingId: string
): Promise<MeetingTranscriptText | null> => {
  try {
    const response = await getMeetingTranscription({ meetingId });
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
 * Hook to fetch and manage the transcription text for a specific meeting
 *
 * @param {string} meetingId - The ID of the meeting
 * @returns {UseQueryResult<MeetingTranscriptText | null, Error>} Query result containing:
 * - data: The transcription text if successful, null otherwise
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
export const useGetMeetingTranscription = (
  meetingId: string
): UseQueryResult<MeetingTranscriptText | null, Error> => {
  return useQuery<MeetingTranscriptText | null, Error>({
    queryKey: ["meeting-transcription", meetingId],
    queryFn: () => getTranscriptionText(meetingId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!meetingId,
  });
};
