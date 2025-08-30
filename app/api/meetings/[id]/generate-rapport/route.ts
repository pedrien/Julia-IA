import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import { NextRequest, NextResponse } from "next/server";

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

    await callApiWithToken(
      tokenOrErrorResponse,
      `meetings/${id}/generate-rapport`,
      {},
      "GET"
    );

    return NextResponse.json(
      {
        message: "Rapport généré avec succès.",
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return handleApiServerError(error);
  }
};
