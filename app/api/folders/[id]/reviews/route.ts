import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import { fakeReviewFolder } from "@/mocks/folders/fake.review-folder";
import {
  ListReviewFolderSchema,
  listReviewFolderSchema,
} from "@/validators/folders/validator.review-folder";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} /api/folders/:id/reviews Get folder reviews
 * @apiName GetFolderReviews
 * @apiGroup Folders
 * @apiDescription
 * Retrieves all reviews for a specific folder.
 *
 * @apiHeader {String} Authorization Bearer access token
 *
 * @apiParam {String} id Folder ID (UUID)
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object[]} data List of folder reviews
 *
 * @apiError (400) {String} message Parameter validation error or no reviews found
 * @apiError (401) {String} message Not authenticated
 * @apiError (404) {String} message Folder not found
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X GET "https://<your-domain>/api/folders/folder-1/reviews" -H "Authorization: Bearer <token>"
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

    // const requestData = await callApiWithToken(
    //   tokenOrErrorResponse,
    //   `folders/${id}/reviews`,
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
    //     { message: "No reviews found for this folder." },
    //     { status: 400 }
    //   );
    // }
    const requestData = fakeReviewFolder;

    const data: ListReviewFolderSchema = validateApiResponse(
      requestData,
      listReviewFolderSchema
    );

    return NextResponse.json(
      {
        message: "Folder reviews retrieved successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
