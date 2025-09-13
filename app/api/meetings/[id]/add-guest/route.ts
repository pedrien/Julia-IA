import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateRequestBody } from "@/libs/validateRequestBody";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import {
  AddGuestMeetingSchema,
  addGuestMeetingSchema,
} from "@/validators/meetings/validator.add-guest-meeting";

import { NextRequest, NextResponse } from "next/server";

/**
 * @api {post} /api/meetings/:id/add-guest Add guest to a meeting
 * @apiName AddGuestMeeting
 * @apiGroup Meetings
 * @apiDescription
 * Adds a guest participant to a specific meeting.
 *
 * @apiParam {String} id Meeting ID
 *
 * @apiHeader {String} Authorization Bearer access token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiBody {String} type Participant type
 * @apiBody {String} external_name Guest name
 * @apiBody {String} external_email Guest email
 * @apiBody {String} external_phone Guest phone
 * @apiBody {String} [external_company] Guest company (optional)
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Guest participant data
 *
 * @apiError (400) {String} message Parameter validation error or invalid request
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X POST "https://<your-domain>/api/meetings/1/add-guest" \
 *          -H "Authorization: Bearer <token>" \
 *          -H "Content-Type: application/json" \
 *          -d '{"type": "EXTERNAL", "external_name": "John Doe", "external_email": "john@example.com", "external_phone": "+1234567890", "external_company": "Acme Corp"}'
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
    const validatedData: AddGuestMeetingSchema = validateRequestBody(
      body,
      addGuestMeetingSchema
    );

    const bodyFormatted = {
      meetingId: id,
      type: validatedData.type,
      name: validatedData.external_name,
      email: validatedData.external_email,
      phone: validatedData.external_phone,
      company: validatedData.external_company,
    };

    console.log(bodyFormatted);
    const requestData = await callApiWithToken(
      tokenOrErrorResponse,
      `meetings/${id}/add-guest`,
      bodyFormatted,
      "POST"
    );

    if (
      !requestData ||
      typeof requestData !== "object" ||
      !("data" in requestData) ||
      !requestData.data
    ) {
      return NextResponse.json(
        { message: "Failed to add guest to this meeting." },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        message: "Guest added to meeting successfully.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
