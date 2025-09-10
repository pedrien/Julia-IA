import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import { fakeMeetingDocument } from "@/mocks/meetings/fake.meeting-details";
import {
  MeetingDocument,
  meetingDocumentSchema,
} from "@/validators/meetings/validator.detail-meetings";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} /api/meetings/:id/documents Get meeting documents
 * @apiName GetMeetingDocuments
 * @apiGroup Meetings
 * @apiDescription
 * Retrieves the documents (recording and report) for a specific meeting.
 *
 * @apiParam {String} id Meeting ID
 *
 * @apiHeader {String} Authorization Bearer access token
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Meeting documents with URLs
 *
 * @apiError (400) {String} message Parameter validation error or no documents found
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X GET "https://<your-domain>/api/meetings/1/documents" -H "Authorization: Bearer <token>"
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

    // const requestData = await callApiWithToken(
    //   tokenOrErrorResponse,
    //   `meetings/${meetingId}/documents`,
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
    //     { message: "No documents found for this meeting." },
    //     { status: 400 }
    //   );
    // }
    const requestData = fakeMeetingDocument;

    const data: MeetingDocument = validateApiResponse(
      requestData,
      meetingDocumentSchema
    );

    return NextResponse.json(
      {
        message: "Meeting documents retrieved successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
