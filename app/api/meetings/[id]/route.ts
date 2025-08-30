import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/auth";
import { APP_CONSTANTS } from "@/constants/appConstants";
import { ENV } from "@/env";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { meetingRecordingDetailSchema } from "@/validators/meetings/validator.meeting-recording-detail";
import { getToken } from "next-auth/jwt";

/**
 * GET /api/meetings/[id] - Récupère les détails d'une réunion
 */
export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const tokenOrErrorResponse = await getToken(req);
    if (tokenOrErrorResponse instanceof NextResponse) {
      return tokenOrErrorResponse;
    }

    const { id } = await params;

    if (!id) {
      return NextResponse.json(
        { message: "ID de la commande requis" },
        { status: 400 }
      );
    }

    // Appel à l'API externe
    const response = await fetch(
      `${ENV.API_LOCAL_BASE_URL}meetings/${meetingId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${session.token.access_token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return NextResponse.json(
        {
          error:
            errorData.error || "Erreur lors de la récupération de la réunion",
        },
        { status: response.status }
      );
    }

    const data = await response.json();

    return NextResponse.json(data);
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
}
