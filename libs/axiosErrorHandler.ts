import axios, { AxiosError } from "axios";
import { NextResponse } from "next/server";

export const handleAxiosError = (error: AxiosError) => {
  if (axios.isAxiosError(error)) {
    if (error.response) {
      if (error.status === 404) {
        return NextResponse.json(
          {
            error: "Oups ! Cette ressource est introuvable.",
          },
          { status: 404 }
        );
      }

      if (error.status === 401) {
        return NextResponse.json(
          {
            error: "Veuillez vous connecter pour accéder à cette ressource.",
          },
          { status: 401 }
        );
      }

      if (error.status === 403) {
        return NextResponse.json(
          {
            error:
              "Vous n’avez pas les droits nécessaires pour effectuer cette action.",
          },
          { status: 403 }
        );
      }

      return NextResponse.json(
        {
          error:
            (error.response.data as { error?: string }).error ||
            error.response.data ||
            "Une erreur interne est survenue. Veuillez réessayer plus tard.",
        },
        {
          status: error.response.status,
        }
      );
    } else if (error.request) {
      // Requête envoyée mais pas de réponse reçue
      return NextResponse.json(
        {
          error:
            "Le service est temporairement indisponible. Veuillez réessayer plus tard.",
        },
        {
          status: 503,
        }
      );
    } else {
      // Erreur lors de la configuration de la requête
      return NextResponse.json(
        {
          error:
            "Une erreur interne est survenue. Veuillez réessayer plus tard.",
        },
        {
          status: 500,
        }
      );
    }
  } else {
    // Erreur non liée à Axios
    return NextResponse.json(
      {
        error: "Une erreur interne est survenue. Veuillez réessayer plus tard.",
      },
      {
        status: 500,
      }
    );
  }
};
