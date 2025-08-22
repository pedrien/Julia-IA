import "server-only";
import { NextRequest, NextResponse } from "next/server";

interface VerifyBearerTokenOptions {
  missingTokenMessage?: string;
  invalidFormatMessage?: string;
}

/**
 * Vérifie si l'en-tête Authorization contient un Bearer token valide.
 *
 * @param {NextRequest} req - La requête entrante de Next.js
 * @param {VerifyBearerTokenOptions} options - Messages personnalisés pour le manque ou l'invalidité du token
 * @returns {string | NextResponse} - Renvoie le token si valide, sinon une réponse d'erreur
 */
export function verifyBearerToken(
  req: NextRequest,
  options: VerifyBearerTokenOptions = {}
): string | NextResponse {
  const authorizationHeader = req.headers.get("Authorization");

  const missingTokenMessage =
    options.missingTokenMessage ||
    "Vous devez être connecté pour accéder à cette ressource.";

  const invalidFormatMessage =
    options.invalidFormatMessage ||
    "Le format d'authentification est incorrect. Veuillez vous reconnecter.";

  if (!authorizationHeader) {
    return NextResponse.json({ message: missingTokenMessage }, { status: 401 });
  }

  const [type, token] = authorizationHeader.split(" ");

  if (type !== "Bearer" || !token) {
    return NextResponse.json(
      { message: invalidFormatMessage },
      { status: 400 }
    );
  }

  return token;
}
