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

    // Parse form data (supports flat keys and bracketed keys)
    const formData = await req.formData();

    // Flat keys (legacy)
    const nomDossier = (formData.get("nom_dossier") as string) || "";
    const legacyDescription = (formData.get("description") as string) || null;
    const legacyFile = (formData.get("fichier") as File) || null;
    const legacySize = (formData.get("size") as string) || null;

    // Bracketed folder keys
    const folderNameBracket = (formData.get("folder[name]") as string) || "";
    const folderDescriptionBracket = ((formData.get(
      "folder[description]"
    ) as string) || null) as string | null;
    const folderParentIdBracket = ((formData.get(
      "folder[parent_id]"
    ) as string) || null) as string | null;
    const folderVisibilityBracket = ((formData.get(
      "folder[visibility]"
    ) as string) || null) as string | null;

    // Bracketed document keys
    const documentTitleBracket =
      (formData.get("document[title]") as string) || "";
    const documentDescriptionBracket = ((formData.get(
      "document[description]"
    ) as string) || null) as string | null;
    const documentVisibilityBracket = ((formData.get(
      "document[visibility]"
    ) as string) || null) as string | null;
    const documentFileBracket = formData.get("document[file]") as File | null;

    // Consolidate values (prefer bracketed if present)
    const fichier = documentFileBracket || legacyFile;
    const folderName = folderNameBracket || nomDossier;
    const folderDescription = folderDescriptionBracket ?? legacyDescription;
    const folderParentId = folderParentIdBracket ?? "dd,dd,d,dnfnfnf";
    const folderVisibility = folderVisibilityBracket ?? "dd,dd,d,dnfnfnf";
    const inferFileName = (file: File | null) =>
      file?.name ? file.name.replace(/\.[^.]+$/, "") : "";
    const documentTitle =
      documentTitleBracket || folderName || inferFileName(fichier);
    const documentDescription = documentDescriptionBracket ?? "dfjfjfjfjf";
    const documentVisibility = documentVisibilityBracket ?? "dd,dd,d,dnfnfnf";

    // Required checks
    if (!folderName) {
      return NextResponse.json(
        { message: "Le nom du dossier est requis (folder[name])." },
        { status: 400 }
      );
    }
    if (!documentTitle) {
      return NextResponse.json(
        { message: "Le titre du document est requis (document[title])." },
        { status: 400 }
      );
    }
    if (!fichier) {
      return NextResponse.json(
        { message: "Le fichier du document est requis (document[file])." },
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
    apiFormData.append("folder[name]", folderName);
    if (folderDescription)
      apiFormData.append("folder[description]", folderDescription);
    // if (folderParentId) apiFormData.append("folder[parent_id]", folderParentId);
    // if (folderVisibility)
    //   apiFormData.append("folder[visibility]", folderVisibility);

    apiFormData.append("document[title]", folderName);
    // if (documentDescription)
    //   apiFormData.append("document[description]", documentDescription);
    // if (documentVisibility)
    //   apiFormData.append("document[visibility]", documentVisibility);
    apiFormData.append("document[file]", fichier);

    // Preserve size if provided by client
    if (legacySize) apiFormData.append("size", legacySize);

    console.log("apiFormData", ...apiFormData);
    const response = await callApiWithToken(
      tokenOrErrorResponse,
      "folders/store-with-document",
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
