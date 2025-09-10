import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { verifyBearerToken } from "@/libs/verifyBearerToken";

import { NextRequest, NextResponse } from "next/server";

/**
 * @api {post} /api/folders/create Create a new folder
 * @apiName CreateFolder
 * @apiGroup Folders
 * @apiDescription
 * Creates a new folder with the provided information and PDF file.
 *
 * @apiHeader {String} Authorization Bearer access token
 * @apiHeader {String} Content-Type multipart/form-data
 *
 * @apiParam {String} nom_dossier Folder name (required)
 * @apiParam {String} description Folder description (required)
 * @apiParam {File} fichier PDF file (max 50MB, application/pdf format)
 * @apiParam {String} size File size in bytes (required)
 *
 * @apiSuccess {String} message Success message
 *
 * @apiError (400) {String} message Validation error or invalid request
 * @apiError (401) {String} message Not authenticated
 * @apiError (413) {String} message File too large
 * @apiError (500) {String} message Internal server error
 */
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const tokenOrErrorResponse = verifyBearerToken(req);
    if (tokenOrErrorResponse instanceof NextResponse) {
      return tokenOrErrorResponse;
    }

    // Parse form data
    const formData = await req.formData();
    const nomDossier = formData.get("nom_dossier") as string;
    const description = formData.get("description") as string;
    const fichier = formData.get("fichier") as File;
    const size = formData.get("size") as string;

    if (!nomDossier || !description || !fichier || !size) {
      return NextResponse.json(
        { message: "Tous les champs sont requis." },
        { status: 400 }
      );
    }

    // Validate file size (50MB max)
    if (fichier.size > 50 * 1024 * 1024) {
      return NextResponse.json(
        { message: "Le fichier ne peut pas dépasser 50MB." },
        { status: 413 }
      );
    }

    // Validate file type
    if (fichier.type !== "application/pdf") {
      return NextResponse.json(
        { message: "Seuls les fichiers PDF sont autorisés." },
        { status: 400 }
      );
    }

    // Create new FormData for API call
    const apiFormData = new FormData();
    apiFormData.append("nom_dossier", nomDossier);
    apiFormData.append("description", description);
    apiFormData.append("fichier", fichier);
    apiFormData.append("size", size);

    console.log("apiFormData", ...apiFormData);
    const response = await callApiWithToken(
      tokenOrErrorResponse,
      "folders/create",
      apiFormData,
      "POST",
      true,
      { "Content-Type": "multipart/form-data" }
    );

    console.log("response", response);

    return NextResponse.json(
      {
        message: "Dossier créé avec succès.",
      },
      { status: 201 }
    );
  } catch (error) {
    return handleApiServerError(error);
  }
};
