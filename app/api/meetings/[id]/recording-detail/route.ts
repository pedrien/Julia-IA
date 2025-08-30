import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import {
  MeetingRecordingDetail,
  meetingRecordingDetailSchema,
} from "@/validators/meetings/validator.meeting-recording-detail";
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

    if (!id) {
      return NextResponse.json(
        { message: "ID de la réunion requis" },
        { status: 400 }
      );
    }

    const requestData = await callApiWithToken(
      tokenOrErrorResponse,
      `meetings/${id}/preview`,
      {},
      "GET"
    );

    const data: MeetingRecordingDetail = validateApiResponse(
      requestData,
      meetingRecordingDetailSchema
    );

    return NextResponse.json(
      {
        message: "Réunion enregistrée avec succès.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log("error", error);
    return handleApiServerError(error);
  }
};
