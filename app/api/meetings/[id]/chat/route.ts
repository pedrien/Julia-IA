import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import {
  ListChatMeetingSchema,
  listChatMeetingSchema,
} from "@/validators/meetings/validator.list-chat-meetings";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} /api/meetings/:id/chat Get meeting chat messages
 * @apiName GetMeetingChat
 * @apiGroup Meetings
 * @apiDescription
 * Retrieves the chat messages for a specific meeting.
 *
 * @apiParam {String} id Meeting ID
 *
 * @apiHeader {String} Authorization Bearer access token
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data List of chat messages
 *
 * @apiError (400) {String} message Parameter validation error or no meeting found
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X GET "https://<your-domain>/api/meetings/1/chat" -H "Authorization: Bearer <token>"
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

    const requestData = await callApiWithToken(
      tokenOrErrorResponse,
      `ai/meetings/${id}/conversations`,
      undefined,
      "GET"
    );

    //const requestData = fakeChatMeetings;

    if (
      !requestData ||
      typeof requestData !== "object" ||
      !("data" in requestData) ||
      !requestData.data
    ) {
      return NextResponse.json(
        { message: "No chat messages found for this meeting." },
        { status: 400 }
      );
    }

    const data: ListChatMeetingSchema = validateApiResponse(
      requestData,
      listChatMeetingSchema
    );

    return NextResponse.json(
      {
        message: "Meeting chat messages retrieved successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
