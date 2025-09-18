// import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import { fakeFoldersList } from "@/mocks/folders/fake.folders";
import {
  ListFolderSchema,
  listFolderSchema,
} from "@/validators/folders/validator.list-folder";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} /api/folders Get list of folders
 * @apiName GetFolders
 * @apiGroup Folders
 * @apiDescription
 * Retrieves a list of folders.
 *
 * @apiHeader {String} Authorization Bearer access token (if not authenticated via session)
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object[]} data List of folders
 *
 * @apiError (400) {String} message Parameter validation error or no folders found
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X GET "https://<your-domain>/api/folders" -H "Authorization: Bearer <token>"
 */
export const GET = async (req: NextRequest) => {
  try {
    const tokenOrErrorResponse = verifyBearerToken(req);
    if (tokenOrErrorResponse instanceof NextResponse) {
      return tokenOrErrorResponse;
    }

    // const requestData = await callApiWithToken(
    //   tokenOrErrorResponse,
    //   `folders`,
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
    //     { message: "No folders found." },
    //     { status: 400 }
    //   );
    // }
    const requestData = fakeFoldersList;

    const data: ListFolderSchema = validateApiResponse(
      requestData,
      listFolderSchema
    );

    return NextResponse.json(
      {
        message: "Folders list retrieved successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
