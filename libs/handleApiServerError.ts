import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { AxiosError } from "axios";
import { handleAxiosError } from "./axiosErrorHandler";

const STATUS_BAD_REQUEST = 400;
const STATUS_INTERNAL_ERROR = 500;
const DEFAULT_VALIDATION_ERROR = "Une erreur de validation est survenue.";
const DEFAULT_UNKNOWN_ERROR = "Une erreur inconnue est survenue.";

/**
 * Handles common application errors (ZodError, AxiosError, and general errors).
 * @param error - The error to handle.
 * @returns NextResponse with error message and appropriate HTTP status.
 */
export function handleApiServerError(error: unknown): NextResponse {
  // Handle Zod validation errors
  if (error instanceof ZodError) {
    const errorMessage =
      process.env.NODE_ENV === "development"
        ? (error as ZodError<unknown>).issues
            .map((e) => `${e.path.join(".")} : ${e.message}`)
            .join(", ")
        : DEFAULT_VALIDATION_ERROR;
    return NextResponse.json(
      { error: errorMessage },
      { status: STATUS_BAD_REQUEST }
    );
  }

  // Handle Axios errors
  if (error instanceof AxiosError) {
    return handleAxiosError(error);
  }

  // Handle general Error instances
  if (error instanceof Error) {
    return NextResponse.json(
      { error: error.message },
      { status: STATUS_INTERNAL_ERROR }
    );
  }

  // Handle unknown errors
  return NextResponse.json(
    { error: DEFAULT_UNKNOWN_ERROR },
    { status: STATUS_INTERNAL_ERROR }
  );
}
