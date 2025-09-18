"use client";

import { handleClientAuthError } from "@/libs/handleClientAuthError";
import { getMeetingChat } from "@/services/meetings/service.get-meeting-chat";
import { ListChatMeetingSchema } from "@/validators/meetings/validator.list-chat-meetings";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getMeetingChatMessages = async (
  meetingId: string
): Promise<ListChatMeetingSchema | null> => {
  try {
    const response = await getMeetingChat({ meetingId });
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
 * Hook to fetch and manage the chat messages for a specific meeting
 *
 * @param {string} meetingId - The ID of the meeting
 * @returns {UseQueryResult<ListChatMeetingSchema | null, Error>} Query result containing:
 * - data: The meeting chat messages if successful, null otherwise
 * - error: Error object if the query failed
 * - isLoading: Boolean indicating if the query is in progress (only for initial load)
 * - isFetching: Boolean indicating if any fetch is in progress
 * - isError: Boolean indicating if the query resulted in an error
 * - refetch: Function to manually refetch the data
 *
 * The query will:
 * - Cache results for 2 minutes (staleTime) - shorter than meeting details as chat is more dynamic
 * - Retry failed requests twice
 * - Refetch on window focus
 * - Only run when meetingId is provided
 */
export const useGetMeetingChat = (
  meetingId: string
): UseQueryResult<ListChatMeetingSchema | null, Error> => {
  return useQuery<ListChatMeetingSchema | null, Error>({
    queryKey: ["meeting-chat", meetingId],
    queryFn: () => getMeetingChatMessages(meetingId),
    staleTime: 2 * 60 * 1000, // 2 minutes - shorter cache for chat messages
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!meetingId,
  });
};
