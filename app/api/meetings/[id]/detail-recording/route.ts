import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import {
  MeetingRecordingDetail,
  meetingRecordingDetailSchema,
} from "@/validators/meetings/validator.meeting-recording-detail";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} /api/meetings/:id/detail-recording Get meeting detail recording
 * @apiName GetMeetingDetailRecording
 * @apiGroup Meetings
 * @apiDescription
 * Retrieves the meeting detail recording data for a specific meeting.
 *
 * @apiParam {String} id Meeting ID
 *
 * @apiHeader {String} Authorization Bearer access token
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Meeting detail recording data
 *
 * @apiError (400) {String} message Parameter validation error or no meeting found
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X GET "https://<your-domain>/api/meetings/1/detail-recording" -H "Authorization: Bearer <token>"
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
      `meetings/${id}/preview`,
      undefined,
      "GET"
    );

    // console.log(requestData.data.participants);
    if (
      !requestData ||
      typeof requestData !== "object" ||
      !("data" in requestData) ||
      !requestData.data
    ) {
      return NextResponse.json(
        { message: "No meeting detail recording found with this ID." },
        { status: 400 }
      );
    }
    //const requestData = fakeMeetingDetailRecording;

    const data: MeetingRecordingDetail = validateApiResponse(
      requestData,
      meetingRecordingDetailSchema
    );

    return NextResponse.json(
      {
        message: "Meeting detail recording retrieved successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
