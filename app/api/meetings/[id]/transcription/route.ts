import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import { fakeMeetingTranscription } from "@/mocks/meetings/fake.meeting-details";
import {
  MeetingTranscriptText,
  meetingTranscriptTextSchema,
} from "@/validators/meetings/validator.detail-meetings";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} /api/meetings/:id/transcription Get meeting transcription
 * @apiName GetMeetingTranscription
 * @apiGroup Meetings
 * @apiDescription
 * Retrieves the transcription text for a specific meeting.
 *
 * @apiParam {String} id Meeting ID
 *
 * @apiHeader {String} Authorization Bearer access token
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Transcription text
 *
 * @apiError (400) {String} message Parameter validation error or no transcription found
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X GET "https://<your-domain>/api/meetings/1/transcription" -H "Authorization: Bearer <token>"
 */
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const tokenOrErrorResponse = verifyBearerToken(req);
    if (tokenOrErrorResponse instanceof NextResponse) {
      return tokenOrErrorResponse;
    }

    const { id } = await params;
    const requestData = await callApiWithToken(
      tokenOrErrorResponse,
      `meetings/${id}/transcriptions`,
      undefined,
      "GET"
    );

    // if (
    //   !requestData ||
    //   typeof requestData !== "object" ||
    //   !("data" in requestData) ||
    //   !requestData.data
    // ) {
    //   return NextResponse.json(
    //     { message: "No transcription found for this meeting." },
    //     { status: 400 }
    //   );
    // }
    // const requestData = fakeMeetingTranscription;

    const data: MeetingTranscriptText = validateApiResponse(
      requestData,
      meetingTranscriptTextSchema
    );

    return NextResponse.json(
      {
        message: "Meeting transcription retrieved successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
