import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
// import { fakeSummaryFolder } from "@/mocks/folders/fake.summary-folder";
import {
  SummaryFolderSchema,
  summaryFolderSchema,
} from "@/validators/folders/validator.summary-folder";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} /api/folders/:id/summary Get folder summary
 * @apiName GetFolderSummary
 * @apiGroup Folders
 * @apiDescription
 * Retrieves the summary for a specific folder.
 *
 * @apiHeader {String} Authorization Bearer access token
 *
 * @apiParam {String} id Folder ID (UUID)
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Folder summary
 *
 * @apiError (400) {String} message Parameter validation error or no summary found
 * @apiError (401) {String} message Not authenticated
 * @apiError (404) {String} message Folder not found
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X GET "https://<your-domain>/api/folders/folder-1/summary" -H "Authorization: Bearer <token>"
 */
export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
  try {
    const tokenOrErrorResponse = verifyBearerToken(req);
    if (tokenOrErrorResponse instanceof NextResponse) {
      return tokenOrErrorResponse;
    }

    const { id } = await params;

    const requestData = await callApiWithToken(
      tokenOrErrorResponse,
      `folders/${id}/summary`,
      undefined,
      "GET"
    );

    if (
      !requestData ||
      typeof requestData !== "object" ||
      !("summary" in requestData) ||
      !requestData.summary
    ) {
      return NextResponse.json(
        { message: "No summary found for this folder." },
        { status: 400 }
      );
    }
    //const requestData = fakeSummaryFolder;

    const data: SummaryFolderSchema = validateApiResponse(
      requestData,
      summaryFolderSchema
    );

    return NextResponse.json(
      {
        message: "Folder summary retrieved successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
