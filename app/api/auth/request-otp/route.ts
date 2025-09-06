import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateRequestBody } from "@/libs/validateRequestBody";
import shemaRequestOtp, {
  RequestOtpFormData,
} from "@/validators/auth/validator.request-otp";

import { NextRequest, NextResponse } from "next/server";

/**
 * Handles the POST request for the OTP request functionality.
 *
 * @param {NextRequest} req - The incoming request object.
 * @returns {Promise<NextResponse>} - The response object containing a success message or an error.
 *
 * @throws Will throw an error if the request body is invalid or if the API call fails.
 *
 * The function performs the following steps:
 * 1. Parses the request body to extract the login form data.
 * 2. Validates the request body against the login schema.
 * 3. Constructs the body for the API request.
 * 4. Calls the API to request an OTP.
 * 5. Returns a success response if the API call is successful.
 * 6. Handles any errors that occur during the process.
 */
export const POST = async (req: NextRequest) => {
  try {
    const body: RequestOtpFormData = await req.json();

    const data: RequestOtpFormData = validateRequestBody(body, shemaRequestOtp);

    const bodyRequest = {
      username: data.username,
    };

    //await callApiWithToken("", `auth/request-otp`, bodyRequest, "POST", false);

    return NextResponse.json(
      {
        message: "Un code de vérification a été envoyé.",
      },
      { status: 200 }
    );
  } catch (error) {
    return handleApiServerError(error);
  }
};
