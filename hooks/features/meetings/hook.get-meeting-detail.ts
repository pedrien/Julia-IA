"use client";

import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { MeetingRecordingDetail } from "@/validators/meetings/validator.meeting-recording-detail";
import { getMeetingDetailRecording } from "@/services/meetings/service.get-meeting-detail-recording";
import { handleClientAuthError } from "@/libs/handleClientAuthError";

/**
 * Hook pour récupérer les détails d'une réunion
 * @param meetingId - L'ID de la réunion à récupérer
 * @returns Les détails de la réunion avec les participants
 */
const fetchMeetingDetail = async (
  meetingId: string
): Promise<MeetingRecordingDetail | null> => {
  try {
    const response = await getMeetingDetailRecording({ id: meetingId });
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

export const useGetMeetingDetailRecording = (
  meetingId: string
): UseQueryResult<MeetingRecordingDetail | null, Error> => {
  return useQuery<MeetingRecordingDetail | null, Error>({
    queryKey: ["meeting-detail-recording", meetingId],
    queryFn: () => fetchMeetingDetail(meetingId),
    enabled: !!meetingId,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000,
    retry: 2,
    refetchOnWindowFocus: false,
  });
};
