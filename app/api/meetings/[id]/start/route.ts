import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {post} /api/meetings/:id/start Start a meeting
 * @apiName StartMeeting
 * @apiGroup Meetings
 * @apiDescription
 * Starts a meeting with the provided meeting ID.
 *
 * @apiHeader {String} Authorization Bearer access token
 *
 * @apiParam {String} id Meeting ID (UUID)
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError (400) {String} message Validation error or invalid request
 * @apiError (401) {String} message Not authenticated
 * @apiError (404) {String} message Meeting not found
 * @apiError (500) {String} message Internal server error
 */
export const POST = async (
  req: NextRequest,
  { params }: { params: { id: string } }
): Promise<NextResponse> => {
  try {
    const tokenOrErrorResponse = verifyBearerToken(req);
    if (tokenOrErrorResponse instanceof NextResponse) {
      return tokenOrErrorResponse;
    }

    const { id } = params;

    // Validate UUID format
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    if (!uuidRegex.test(id)) {
      return NextResponse.json(
        { message: "L'ID de la réunion doit être un UUID valide." },
        { status: 400 }
      );
    }

    await callApiWithToken(
      tokenOrErrorResponse,
      `meetings/${id}/start`,
      {},
      "POST"
    );

    return NextResponse.json(
      {
        message: "Réunion démarrée avec succès.",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiServerError(error);
  }
};
