import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import {
  MeetingParticipantList,
  meetingParticipantListSchema,
} from "@/validators/meetings/validator.detail-meetings";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} /api/meetings/:id/participants Get meeting participants
 * @apiName GetMeetingParticipants
 * @apiGroup Meetings
 * @apiDescription
 * Retrieves the list of participants for a specific meeting.
 *
 * @apiParam {String} id Meeting ID
 *
 * @apiHeader {String} Authorization Bearer access token
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Participants list with internal and guest participants
 *
 * @apiError (400) {String} message Parameter validation error or no participants found
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X GET "https://<your-domain>/api/meetings/1/participants" -H "Authorization: Bearer <token>"
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
      `meetings/${id}/participants`,
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
    //     { message: "No participants found for this meeting." },
    //     { status: 400 }
    //   );
    // }
    // const requestData = fakeMeetingParticipants;
    // console.log(requestData.data);
    const data: MeetingParticipantList = validateApiResponse(
      requestData,
      meetingParticipantListSchema
    );

    return NextResponse.json(
      {
        message: "Meeting participants retrieved successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
