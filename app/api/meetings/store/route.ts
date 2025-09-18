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

    // Normalize/format scheduled_start_time to 'YYYY-MM-DD HH:mm:ss'
    const normalizeDateTime = (input: string): string => {
      // If string already matches 'YYYY-MM-DD HH:MM:SS', trim any trailing extras
      const match = input.match(/^(\d{4}-\d{2}-\d{2})[ T](\d{2}:\d{2}:\d{2})/);
      if (match) {
        return `${match[1]} ${match[2]}`;
      }
      // Try to parse as Date (ISO or other) and format to local 'YYYY-MM-DD HH:MM:SS'
      const date = new Date(input);
      if (!isNaN(date.getTime())) {
        const pad = (n: number) => n.toString().padStart(2, "0");
        const yyyy = date.getFullYear();
        const mm = pad(date.getMonth() + 1);
        const dd = pad(date.getDate());
        const hh = pad(date.getHours());
        const mi = pad(date.getMinutes());
        const ss = pad(date.getSeconds());
        return `${yyyy}-${mm}-${dd} ${hh}:${mi}:${ss}`;
      }
      // Fallback: keep original but ensure no duplicate ' 00:00:00'
      return input.replace(/\s+00:00:00\s*$/, "");
    };

    // Format data for API before sending
    const formattedData = {
      title: validatedData.title,
      description: validatedData.description,
      scheduled_start_time: normalizeDateTime(
        validatedData.scheduled_start_time
      ),
      location: validatedData.location,
      participants_interne: validatedData.participants_interne,
      participants_externe: validatedData.participants_externe || [],
    };
    console.log(formattedData);

    const requestData = await callApiWithToken(
      tokenOrErrorResponse,
      "meetings/store",
      formattedData,
      "POST"
    );

    // const requestData = {
    //   data: {
    //     id: "2",
    //   },
    // };

    const data: ResponseCreateMeetingSchema = validateApiResponse(
      requestData,
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
    // Best-effort log for Axios-like errors without using 'any'
    const maybeResponse = (error as { response?: unknown })?.response;
    console.log(maybeResponse);
    return handleApiServerError(error);
  }
};
