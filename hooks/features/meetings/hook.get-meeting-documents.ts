"use client";

import { handleClientAuthError } from "@/libs/handleClientAuthError";
import { getMeetingDocuments } from "@/services/meetings/service.get-meeting-documents";
import { MeetingDocument } from "@/validators/meetings/validator.detail-meetings";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getDocumentsList = async (
  meetingId: string
): Promise<MeetingDocument | null> => {
  try {
    const response = await getMeetingDocuments({ meetingId });
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
 * Hook to fetch and manage the documents for a specific meeting
 *
 * @param {string} meetingId - The ID of the meeting
 * @returns {UseQueryResult<MeetingDocument | null, Error>} Query result containing:
 * - data: The meeting documents if successful, null otherwise
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
export const useGetMeetingDocuments = (
  meetingId: string
): UseQueryResult<MeetingDocument | null, Error> => {
  return useQuery<MeetingDocument | null, Error>({
    queryKey: ["meeting-documents", meetingId],
    queryFn: () => getDocumentsList(meetingId),
    // staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!meetingId,
  });
};
