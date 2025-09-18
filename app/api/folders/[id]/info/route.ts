import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
// import { fakeInfoFolder } from "@/mocks/folders/fake.info-folder";
import {
  InfoFolderSchema,
  infoFolderSchema,
} from "@/validators/folders/validator.info-folder";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} /api/folders/:id/info Get folder information
 * @apiName GetFolderInfo
 * @apiGroup Folders
 * @apiDescription
 * Retrieves detailed information for a specific folder.
 *
 * @apiHeader {String} Authorization Bearer access token
 *
 * @apiParam {String} id Folder ID (UUID)
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Folder information
 *
 * @apiError (400) {String} message Parameter validation error or no folder found
 * @apiError (401) {String} message Not authenticated
 * @apiError (404) {String} message Folder not found
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X GET "https://<your-domain>/api/folders/folder-1/info" -H "Authorization: Bearer <token>"
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
      `folders/${id}/info`,
      undefined,
      "GET"
    );

    if (
      !requestData ||
      typeof requestData !== "object" ||
      !("id" in requestData) ||
      !requestData.id
    ) {
      return NextResponse.json(
        { message: "No folder found with this ID." },
        { status: 400 }
      );
    }
    //const requestData = fakeInfoFolder;

    const data: InfoFolderSchema = validateApiResponse(
      requestData,
      infoFolderSchema
    );

    return NextResponse.json(
      {
        message: "Folder information retrieved successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
