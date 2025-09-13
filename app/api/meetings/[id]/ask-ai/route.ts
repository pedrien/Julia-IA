import { callApiWithToken } from "@/libs/axiosServer";
import { handleApiServerError } from "@/libs/handleApiServerError";
import { validateApiResponse } from "@/libs/validateApiResponse";
import { validateRequestBody } from "@/libs/validateRequestBody";
import { verifyBearerToken } from "@/libs/verifyBearerToken";
import {
  fakeChatMeetings,
  getRandomResponseAskAi,
  getResponseAskAiById,
} from "@/mocks/meetings/fake.chat-meetings";
import {
  AskAiMeetingSchema,
  askAiMeetingSchema,
  responseAskAiMeetingSchema,
  ResponseAskAiMeetingSchema,
} from "@/validators/meetings/validator.ask-ai-meeting";
import { NextRequest, NextResponse } from "next/server";

/**
 * @api {post} /api/meetings/:id/ask-ai Ask AI a question about a meeting
 * @apiName AskAiMeeting
 * @apiGroup Meetings
 * @apiDescription
 * Sends a question to the AI about a specific meeting and returns the AI's response.
 *
 * @apiParam {String} id Meeting ID
 *
 * @apiHeader {String} Authorization Bearer access token
 * @apiHeader {String} Content-Type application/json
 *
 * @apiBody {String} message The question to ask the AI
 *
 * @apiSuccess {String} message Success message
 * @apiSuccess {Object} data AI response with chat message
 *
 * @apiError (400) {String} message Parameter validation error or invalid request
 * @apiError (401) {String} message Not authenticated
 * @apiError (500) {String} message Internal server error
 *
 * @example {curl} Example usage:
 *     curl -X POST "https://<your-domain>/api/meetings/1/ask-ai" \
 *          -H "Authorization: Bearer <token>" \
 *          -H "Content-Type: application/json" \
 *          -d '{"message": "What were the key decisions made in this meeting?"}'
 */
export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) => {
  try {
    const tokenOrErrorResponse = verifyBearerToken(req);
    if (tokenOrErrorResponse instanceof NextResponse) {
      return tokenOrErrorResponse;
    }

    const { id } = await params;
    const body = await req.json();

    const validatedBody: AskAiMeetingSchema = validateRequestBody(
      body,
      askAiMeetingSchema
    );
    // const requestData = await callApiWithToken(
    //   tokenOrErrorResponse,
    //   `meetings/${id}/ask-ai`,
    //   { message: validatedBody.message },
    //   "POST"
    // );

    const requestData = getRandomResponseAskAi();

    // // Mock response for testing
    // const requestData = {
    //   data: {
    //     id: `chat-ai-${Date.now()}`,
    //     type: "AI",
    //     message: `Merci pour votre question : "${validatedBody.message}". Voici ma réponse basée sur l'analyse de la réunion :\n\n**Résumé de la question :** ${validatedBody.message}\n\n**Réponse de l'IA :**\n• J'ai analysé l'enregistrement de la réunion\n• Voici les points clés que j'ai identifiés\n• Les décisions importantes prises sont...\n• Les prochaines étapes recommandées sont...\n\nN'hésitez pas si vous avez d'autres questions !`,
    //     date_time: new Date().toISOString().slice(0, 19).replace("T", " "),
    //   },
    // };

    console.log(requestData);

    if (
      !requestData ||
      typeof requestData !== "object" ||
      !("data" in requestData) ||
      !requestData.data
    ) {
      return NextResponse.json(
        { message: "Failed to get AI response for this meeting." },
        { status: 400 }
      );
    }

    const data: ResponseAskAiMeetingSchema = validateApiResponse(
      requestData.data,
      responseAskAiMeetingSchema
    );

    return NextResponse.json(
      {
        message: "AI response generated successfully.",
        data: data,
      },
      { status: 200 }
    );
  } catch (error) {
    console.log(error);
    return handleApiServerError(error);
  }
};
