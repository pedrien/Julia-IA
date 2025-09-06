import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import { fakeParticipantsList } from "@/mocks/participants/fake.participants";
import {
  ListParticipants,
  listParticipantsSchema,
} from "@/validators/participants/validator.list-participants";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} /api/participants Get list of participants
 * @apiName GetParticipants
 * @apiGroup Participants
 * @apiDescription
 * Retrieves a list of participants.
 *
 * @apiHeader {String} Authorization Bearer access token (if not authenticated via session)
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object[]} data List of participants
 *
 * @apiError (400) {String} message Parameter validation error or no participants found
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X GET "https://<your-domain>/api/participants" -H "Authorization: Bearer <token>"
 */
export const GET = async (req: NextRequest) => {
  try {
    const tokenOrErrorResponse = verifyBearerToken(req);
    if (tokenOrErrorResponse instanceof NextResponse) {
      return tokenOrErrorResponse;
    }

    // const requestData = await callApiWithToken(
    //   tokenOrErrorResponse,
    //   `meetings/participants`,
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
    //     { message: "No participants found." },
    //     { status: 400 }
    //   );
    // }
    const requestData = fakeParticipantsList;

    const data: ListParticipants = validateApiResponse(
      requestData,
      listParticipantsSchema
    );

    return NextResponse.json(
      {
        message: "Participants list retrieved successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
