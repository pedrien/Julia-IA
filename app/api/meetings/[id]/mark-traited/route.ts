import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import { markMeetingTraitedSchema } from "@/validators/meetings/validator.mark-meeting-traited";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {patch} /api/meetings/:id/mark-traited Mark meeting as treated
 * @apiName MarkMeetingTraited
 * @apiGroup Meetings
 * @apiDescription
 * Marks a specific meeting as treated/processed.
 *
 * @apiParam {String} id Meeting ID
 *
 * @apiHeader {String} Authorization Bearer access token
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Meeting status update confirmation
 *
 * @apiError (400) {String} message Parameter validation error
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X PATCH "https://<your-domain>/api/meetings/1/mark-traited" -H "Authorization: Bearer <token>"
 */
export const PATCH = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const tokenOrErrorResponse = verifyBearerToken(req);
    if (tokenOrErrorResponse instanceof NextResponse) {
      return tokenOrErrorResponse;
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "Meeting ID is required" },
        { status: 400 }
      );
    }

    // Validation du meetingId
    const validatedData = markMeetingTraitedSchema.parse({ meetingId: id });
    console.log(validatedData);

    // const requestData = await callApiWithToken(
    //   tokenOrErrorResponse,
    //   `meetings/${id}/mark-traited`,
    //   undefined,
    //   "PATCH"
    // );

    return NextResponse.json(
      {
        message: "Meeting marked as treated successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
