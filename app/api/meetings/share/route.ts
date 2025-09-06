import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { validateRequestBody } from "@/libs/validateRequestBody";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import {
  sharingMeetingParticipantSchema,
  type SharingMeetingParticipant,
} from "@/validators/meetings/validator.sharing-meeting";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {post} /api/meetings/share Share a meeting
 * @apiName ShareMeeting
 * @apiGroup Meetings
 * @apiDescription
 * Shares a meeting with internal and external participants.
 *
 * @apiHeader {String} Authorization Bearer access token
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError (400) {String} message Validation error or invalid request
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 */
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const tokenOrErrorResponse = verifyBearerToken(req);
    if (tokenOrErrorResponse instanceof NextResponse) {
      return tokenOrErrorResponse;
    }

    const body: SharingMeetingParticipant = await req.json();

    const validatedData: SharingMeetingParticipant = validateRequestBody(
      body,
      sharingMeetingParticipantSchema
    );

    // Format data for API before sending
    const formattedData = {
      meeting_id: validatedData.meeting_id,
      external_participant: validatedData.external_participant,
      internal_participant: validatedData.internal_participant,
    };
    console.log(formattedData);

    // const requestData = await callApiWithToken(
    //   tokenOrErrorResponse,
    //   "meetings/share",
    //   formattedData,
    //   "POST"
    // );

    const requestData = {
      data: {
        shared: true,
        meeting_id: validatedData.meeting_id,
      },
    };

    return NextResponse.json(
      {
        message: "Réunion partagée avec succès.",
        data: requestData.data,
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiServerError(error);
  }
};
