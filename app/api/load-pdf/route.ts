import { NextRequest, NextResponse } from "next/server";

/**
 * @api {get} /api/load-pdf Get PDF document
 * @apiName GetPDF
 * @apiGroup PDF
 * @apiDescription
 * Fetches a PDF document from Firebase Storage and returns it as ArrayBuffer to avoid CORS issues.
 *
 * @apiSuccess {ArrayBuffer} PDF document as ArrayBuffer
 *
 * @apiError (400) {String} message PDF URL not provided
 * @apiError (500) {String} message Internal server error or failed to fetch PDF
 *
 * @example {curl} Example usage:
 *     curl -X GET "https://<your-domain>/api/pdf?url=<pdf-url>"
 */
export const GET = async (req: NextRequest) => {
  try {
    const { searchParams } = new URL(req.url);
    const pdfUrl = searchParams.get("url");

    if (!pdfUrl) {
      return NextResponse.json(
        { message: "PDF URL is required" },
        { status: 400 }
      );
    }

    // Fetch PDF from Firebase Storage (server-side, no CORS issues)
    const response = await fetch(pdfUrl, {
      headers: {
        Accept: "application/pdf",
      },
    });

    if (!response.ok) {
      return NextResponse.json(
        { message: `Failed to fetch PDF: ${response.statusText}` },
        { status: response.status }
      );
    }

    const pdfBuffer = await response.arrayBuffer();

    // Return PDF as ArrayBuffer with proper headers
    return new NextResponse(pdfBuffer, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": pdfBuffer.byteLength.toString(),
        "Cache-Control": "public, max-age=3600",
      },
    });
  } catch (error) {
    console.error("Error fetching PDF:", error);
    return NextResponse.json(
      { message: "Internal server error while fetching PDF" },
      { status: 500 }
    );
  }
};
