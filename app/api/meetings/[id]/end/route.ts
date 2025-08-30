import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {post} /api/meetings/:id/end End a meeting
 * @apiName EndMeeting
 * @apiGroup Meetings
 * @apiDescription
 * Ends a meeting with the provided meeting ID and audio file.
 *
 * @apiHeader {String} Authorization Bearer access token
 * @apiHeader {String} Content-Type multipart/form-data
 *
 * @apiParam {String} id Meeting ID (UUID)
 * @apiParam {File} audio_file Audio file (max 50MB, audio/* format)
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError (400) {String} message Validation error or invalid request
 * @apiError (401) {String} message Not authenticated
 * @apiError (404) {String} message Meeting not found
 * @apiError (413) {String} message File too large
 * @apiError (500) {String} message Internal server error
 */
export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
): Promise<NextResponse> => {
  try {
    const tokenOrErrorResponse = verifyBearerToken(req);
    if (tokenOrErrorResponse instanceof NextResponse) {
      return tokenOrErrorResponse;
    }

    const { id } = await params;

    // Parse form data
    const formData = await req.formData();
    const audioFile = formData.get("audio_file") as File;

    if (!audioFile) {
      return NextResponse.json(
        { message: "Le fichier audio est requis." },
        { status: 400 }
      );
    }

    // Validate file size (50MB max)
    if (audioFile.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { message: "Le fichier audio ne peut pas dépasser 50MB." },
        { status: 413 }
      );
    }

    // Validate file type
    if (!audioFile.type.startsWith("audio/")) {
      return NextResponse.json(
        { message: "Le fichier doit être un fichier audio." },
        { status: 400 }
      );
    }

    // Create new FormData for API call
    const apiFormData = new FormData();
    apiFormData.append("audio_file", audioFile);

    console.log("apiFormData", ...apiFormData);
    // await callApiWithToken(
    //   tokenOrErrorResponse,
    //   `meetings/${id}/end`,
    //   apiFormData,
    //   "POST"
    // );

    return NextResponse.json(
      {
        message: "Réunion terminée avec succès.",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiServerError(error);
  }
};
