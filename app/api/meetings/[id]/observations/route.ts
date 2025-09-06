import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import { getParticipantObservations } from "@/mocks/meetings/fake.meeting-details";
import {
  ListOberservationParticipants,
  listOberservationParticipantsSchema,
} from "@/validators/participants/validator.list-oberservation-participants";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} /api/meetings/:id/observations Get participant observations for a meeting
 * @apiName GetParticipantObservations
 * @apiGroup Meetings
 * @apiDescription
 * Retrieves the list of observations for a specific participant in a specific meeting.
 *
 * @apiParam {String} id Meeting ID
 * @apiQuery {String} participantId Participant ID
 *
 * @apiHeader {String} Authorization Bearer access token
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data List of participant observations with content and timestamps
 *
 * @apiError (400) {String} message Parameter validation error or no observations found
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X GET "https://<your-domain>/api/meetings/1/observations?participantId=2" -H "Authorization: Bearer <token>"
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
    const { searchParams } = new URL(req.url);
    const participantId = searchParams.get("participantId");

    if (!id) {
      return NextResponse.json(
        { message: "Meeting ID is required" },
        { status: 400 }
      );
    }

    if (!participantId) {
      return NextResponse.json(
        { message: "Participant ID is required" },
        { status: 400 }
      );
    }

    // const requestData = await callApiWithToken(
    //   tokenOrErrorResponse,
    //   `meetings/${id}/observations?participantId=${participantId}`,
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
    //     { message: "No observations found for this participant in this meeting." },
    //     { status: 400 }
    //   );
    // }
    const requestData = getParticipantObservations(participantId);

    const data: ListOberservationParticipants = validateApiResponse(
      requestData,
      listOberservationParticipantsSchema
    );

    return NextResponse.json(
      {
        message: "Participant observations retrieved successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
