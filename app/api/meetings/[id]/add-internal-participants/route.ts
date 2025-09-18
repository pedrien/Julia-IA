import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import { addInternalParticipantSchema } from "@/validators/meetings/validator.add-internal-participant";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {post} /api/meetings/:id/add-internal-participants Add internal participants to a meeting
 * @apiName AddInternalParticipantsMeeting
 * @apiGroup Meetings
 * @apiDescription
 * Adds internal participants to a specific meeting.
 *
 * @apiParam {String} id Meeting ID
 *
 * @apiHeader {String} Authorization Bearer access token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiBody {String[]} participantIds Array of participant IDs
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError (400) {String} message Parameter validation error or invalid request
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X POST "https://<your-domain>/api/meetings/1/add-internal-participants" \
 *          -H "Authorization: Bearer <token>" \
 *          -H "Content-Type: application/json" \
 *          -d '{"participantIds": ["participant-1", "participant-2", "participant-3"]}'
 */
export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const tokenOrErrorResponse = verifyBearerToken(req);
    if (tokenOrErrorResponse instanceof NextResponse) {
      return tokenOrErrorResponse;
    }

    const { id } = await params;
    const body = await req.json();

    // Validate request body
    const validatedBody = addInternalParticipantSchema.parse({
      meetingId: id,
      participantIds: body.participantIds,
    });

    const requestData = await callApiWithToken(
      tokenOrErrorResponse,
      `meetings/${id}/add-internal-participants`,
      {
        participantIds: validatedBody.participantIds,
      },
      "POST"
    );

    console.log(requestData);

    if (
      !requestData ||
      typeof requestData !== "object" ||
      !("data" in requestData) ||
      !requestData.data
    ) {
      return NextResponse.json(
        { message: "Failed to add internal participants to this meeting." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Internal participants added to meeting successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
