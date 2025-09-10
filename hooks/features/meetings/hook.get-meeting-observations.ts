"use client";

import { handleClientAuthError } from "@/libs/handleClientAuthError";
import { getParticipantObservations } from "@/services/meetings/service.get-meeting-observations";
import { ListOberservationParticipants } from "@/validators/participants/validator.list-oberservation-participants";
import { useQuery, UseQueryResult } from "@tanstack/react-query";

const getObservationsList = async (
  meetingId: string,
  participantId: string
): Promise<ListOberservationParticipants | null> => {
  try {
    const response = await getParticipantObservations({
      meetingId,
      participantId,
    });
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
 * Hook to fetch and manage the observations for a specific participant in a specific meeting
 *
 * @param {string} meetingId - The ID of the meeting
 * @param {string} participantId - The ID of the participant
 * @returns {UseQueryResult<ListOberservationParticipants | null, Error>} Query result containing:
 * - data: The participant observations if successful, null otherwise
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
 * - Only run when both meetingId and participantId are provided
 */
export const useGetParticipantObservations = (
  meetingId: string,
  participantId: string
): UseQueryResult<ListOberservationParticipants | null, Error> => {
  return useQuery<ListOberservationParticipants | null, Error>({
    queryKey: ["participant-observations", meetingId, participantId],
    queryFn: () => getObservationsList(meetingId, participantId),
    staleTime: 5 * 60 * 1000,
    refetchOnWindowFocus: true,
    retry: 2,
    enabled: !!meetingId && !!participantId,
  });
};
