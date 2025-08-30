import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { validateRequestBody } from "@/libs/validateRequestBody";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import {
  createMeetingSchema,
  ResponseCreateMeetingSchema,
  responseCreateMeetingSchema,
  type CreateMeetingSchema,
} from "@/validators/meetings/validator.create-meeting";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {post} /api/meetings/store Create a new meeting
 * @apiName CreateMeeting
 * @apiGroup Meetings
 * @apiDescription
 * Creates a new meeting with the provided information.
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

    const body: CreateMeetingSchema = await req.json();

    const validatedData: CreateMeetingSchema = validateRequestBody(
      body,
      createMeetingSchema
    );

    // Format data for API before sending
    const formattedData = {
      title: validatedData.title,
      description: validatedData.description,
      scheduled_start_time: validatedData.scheduled_start_time,
      location: validatedData.location,
      participants_interne: validatedData.participants_interne,
      participants_externe: validatedData.participants_externe || [],
    };
    console.log(formattedData);

    // await callApiWithToken(
    //   tokenOrErrorResponse,
    //   "meetings/store",
    //   formattedData,
    //   "POST"
    // );

    const response = {
      data: {
        id: "123",
      },
    };

    const data: ResponseCreateMeetingSchema = validateApiResponse(
      response,
      responseCreateMeetingSchema
    );

    return NextResponse.json(
      {
        message: "Réunion créée avec succès.",
        data: data,
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiServerError(error);
  }
};
