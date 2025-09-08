import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import { fakeMeetingsList } from "@/mocks/meetings/fake.meetings";
import {
  listMeetingSchema,
  ListMeetings,
} from "@/validators/meetings/validator.list-meeting";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} /api/meetings Get list of meetings
 * @apiName GetMeetings
 * @apiGroup Meetings
 * @apiDescription
 * Retrieves a list of meetings.
 *
 * @apiHeader {String} Authorization Bearer access token (if not authenticated via session)
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object[]} data List of meetings
 *
 * @apiError (400) {String} message Parameter validation error or no meetings found
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X GET "https://<your-domain>/api/meetings" -H "Authorization: Bearer <token>"
 */
export const GET = async (req: NextRequest) => {
  try {
    const tokenOrErrorResponse = verifyBearerToken(req);
    if (tokenOrErrorResponse instanceof NextResponse) {
      return tokenOrErrorResponse;
    }

    const requestData = await callApiWithToken(
      tokenOrErrorResponse,
      `meetings`,
      undefined,
      "GET"
    );

    if (
      !requestData ||
      typeof requestData !== "object" ||
      !("data" in requestData) ||
      !requestData.data
    ) {
      return NextResponse.json(
        { message: "No meetings found." },
        { status: 400 }
      );
    }
    // const requestData = fakeMeetingsList;

    const data: ListMeetings = validateApiResponse(
      requestData,
      listMeetingSchema
    );

    return NextResponse.json(
      {
        message: "Meetings list retrieved successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
