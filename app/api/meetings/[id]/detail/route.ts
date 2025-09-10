import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import { fakeMeetingDetail } from "@/mocks/meetings/fake.meeting-details";
import {
  DetailMeeting,
  detailMeetingSchema,
} from "@/validators/meetings/validator.detail-meetings";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} /api/meetings/:id/detail Get meeting details
 * @apiName GetMeetingDetail
 * @apiGroup Meetings
 * @apiDescription
 * Retrieves the details for a specific meeting.
 *
 * @apiParam {String} id Meeting ID
 *
 * @apiHeader {String} Authorization Bearer access token
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Meeting details
 *
 * @apiError (400) {String} message Parameter validation error or no meeting found
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X GET "https://<your-domain>/api/meetings/1/detail" -H "Authorization: Bearer <token>"
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

    // const requestData = await callApiWithToken(
    //   tokenOrErrorResponse,
    //   `meetings/${meetingId}/detail`,
    //   undefined,
    //   "GET"
    // );

    // if (
    //   !requestData ||
    //   typeof requestData !== "object" ||
    //   !("data" in requestData) ||
    //   !requestData.data
    // ) {
    //   return NextResponse.json(
    //     { message: "No meeting found with this ID." },
    //     { status: 400 }
    //   );
    // }
    const requestData = fakeMeetingDetail;

    const data: DetailMeeting = validateApiResponse(
      requestData,
      detailMeetingSchema
    );

    return NextResponse.json(
      {
        message: "Meeting details retrieved successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
