import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import { fakeFileFolder } from "@/mocks/folders/fake.file-folder";
import {
  FileFolderSchema,
  fileFolderSchema,
} from "@/validators/folders/validator.file-folder";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} /api/folders/:id/file Get folder file URL
 * @apiName GetFolderFile
 * @apiGroup Folders
 * @apiDescription
 * Retrieves the file URL for a specific folder.
 *
 * @apiHeader {String} Authorization Bearer access token
 *
 * @apiParam {String} id Folder ID (UUID)
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Folder file data
 *
 * @apiError (400) {String} message Parameter validation error or no file found
 * @apiError (401) {String} message Not authenticated
 * @apiError (404) {String} message Folder not found
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X GET "https://<your-domain>/api/folders/folder-1/file" -H "Authorization: Bearer <token>"
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
      `folders/${id}/file`,
      undefined,
      "GET"
    );

    if (
      !requestData ||
      typeof requestData !== "object" ||
      !("file_url" in requestData) ||
      !requestData.file_url
    ) {
      return NextResponse.json(
        { message: "No file found for this folder." },
        { status: 400 }
      );
    }
    //const requestData = fakeFileFolder;

    const data: FileFolderSchema = validateApiResponse(
      requestData,
      fileFolderSchema
    );

    return NextResponse.json(
      {
        message: "Folder file retrieved successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
