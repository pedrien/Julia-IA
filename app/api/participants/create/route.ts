import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";

import { validateRequestBody } from "@/libs/validateRequestBody";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import {
  createParticipantSchema,
  type CreateParticipantSchema,
} from "@/validators/participants/validator.create-participant";

import { NextRequest, NextResponse } from "next/server";

/**
 * @api {post} /api/participants/create Create a new participant
 * @apiName CreateParticipant
 * @apiGroup Participants
 * @apiDescription
 * Creates a new participant with the provided information.
 *
 * @apiHeader {String} Authorization Bearer access token
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data Created participant data
 *
 * @apiError (400) {String} message Validation error or invalid request
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 */
export const POST = async (req: NextRequest): Promise<NextResponse> => {
  try {
    const tokenOrErrorResponse = verifyBearerToken(req);
    if (tokenOrErrorResponse instanceof NextResponse) {
      return tokenOrErrorResponse;
    }

    const body: CreateParticipantSchema = await req.json();

    const validatedData: CreateParticipantSchema = validateRequestBody(
      body,
      createParticipantSchema
    );

    // Format data for API before sending
    const formattedData = {
      type: validatedData.type,
      name: validatedData.external_name,
      email: validatedData.external_email,
      phone: validatedData.external_phone,
      company: validatedData.external_company,
    };
    console.log(formattedData);
    await callApiWithToken(
      tokenOrErrorResponse,
      "external-participants/store",
      formattedData,
      "POST"
    );

    return NextResponse.json(
      {
        message: "Participant créé avec succès.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.log(error.response);
    return handleApiServerError(error);
  }
};
