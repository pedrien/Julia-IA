import { ListChatMeetingSchema } from "@/validators/meetings/validator.list-chat-meetings";
import { ResponseAskAiMeetingSchema } from "@/validators/meetings/validator.ask-ai-meeting";

/**
 * Données factices pour les chats de meetings
 * Simule une conversation entre un utilisateur et l'IA Julia
 */

export const fakeChatMeetings: ListChatMeetingSchema = {
  data: [
    {
      id: "chat-001",
      type: "USER",
      message: "Bonjour Julia, peux-tu me faire un résumé de cette réunion ?",
      date_time: "2024-01-15 09:30:15",
    },
    {
      id: "chat-002",
      type: "AI",
      message:
        "Bonjour ! Bien sûr, je vais analyser l'enregistrement de la réunion et vous fournir un résumé détaillé. Laissez-moi quelques instants pour traiter les données.",
      date_time: "2024-01-15 09:30:22",
    },
    {
      id: "chat-003",
      type: "USER",
      message:
        "Parfait, merci. J'aimerais aussi connaître les points clés discutés.",
      date_time: "2024-01-15 09:31:45",
    },
    {
      id: "chat-004",
      type: "AI",
      message:
        "Voici le résumé de votre réunion du 15 janvier 2024 :\n\n**Participants :** 5 personnes\n**Durée :** 1h 23min\n\n**Points clés :**\n• Discussion sur le nouveau projet MIZARU\n• Budget alloué : 150 000€\n• Échéance : 30 mars 2024\n• Responsable technique : Jean Dupont\n• Prochain point : 22 janvier 2024",
      date_time: "2024-01-15 09:32:18",
    },
    {
      id: "chat-005",
      type: "USER",
      message:
        "Excellent ! Peux-tu me générer un rapport PDF avec ces informations ?",
      date_time: "2024-01-15 09:33:02",
    },
    {
      id: "chat-006",
      type: "AI",
      message:
        "Bien entendu ! Je vais générer un rapport PDF professionnel avec toutes les informations de la réunion. Le fichier sera disponible dans quelques secondes.",
      date_time: "2024-01-15 09:33:15",
    },
    {
      id: "chat-007",
      type: "USER",
      message: "Merci Julia, c'est parfait !",
      date_time: "2024-01-15 09:33:45",
    },
    {
      id: "chat-008",
      type: "AI",
      message:
        "De rien ! N'hésitez pas si vous avez d'autres questions sur cette réunion ou si vous souhaitez analyser d'autres enregistrements.",
      date_time: "2024-01-15 09:34:01",
    },
  ],
};

/**
 * Données factices pour un chat de meeting plus court (exemple alternatif)
 */
export const fakeShortChatMeetings: ListChatMeetingSchema = {
  data: [
    {
      id: "chat-short-001",
      type: "USER",
      message: "Résumé rapide de la réunion ?",
      date_time: "2024-01-16 14:20:10",
    },
    {
      id: "chat-short-002",
      type: "AI",
      message:
        "Résumé : Réunion de 45min avec 3 participants. Discussion sur l'implémentation du module de chat. Décision : utiliser React + TypeScript. Prochaine réunion : 20 janvier.",
      date_time: "2024-01-16 14:20:25",
    },
  ],
};

/**
 * Données factices pour un chat de meeting avec erreur (exemple d'erreur)
 */
export const fakeErrorChatMeetings: ListChatMeetingSchema = {
  data: [
    {
      id: "chat-error-001",
      type: "USER",
      message: "Peux-tu analyser cette réunion ?",
      date_time: "2024-01-17 10:15:30",
    },
    {
      id: "chat-error-002",
      type: "AI",
      message:
        "Je rencontre un problème avec l'analyse de cette réunion. L'enregistrement semble corrompu ou la qualité audio est trop faible. Pouvez-vous vérifier le fichier ?",
      date_time: "2024-01-17 10:15:45",
    },
  ],
};

/**
 * Données factices pour un chat de meeting technique (exemple technique)
 */
export const fakeTechnicalChatMeetings: ListChatMeetingSchema = {
  data: [
    {
      id: "chat-tech-001",
      type: "USER",
      message: "Julia, peux-tu analyser les performances de cette réunion ?",
      date_time: "2024-01-18 16:45:12",
    },
    {
      id: "chat-tech-002",
      type: "AI",
      message:
        "Analyse des performances de la réunion :\n\n**Métriques :**\n• Temps de parole par participant\n• Interruptions : 12\n• Questions posées : 8\n• Décisions prises : 3\n\n**Recommandations :**\n• Réduire les interruptions\n• Structurer mieux les discussions\n• Préparer un agenda plus détaillé",
      date_time: "2024-01-18 16:45:28",
    },
    {
      id: "chat-tech-003",
      type: "USER",
      message: "Très utile ! Peux-tu exporter ces données en Excel ?",
      date_time: "2024-01-18 16:46:15",
    },
    {
      id: "chat-tech-004",
      type: "AI",
      message:
        "Parfait ! Je vais générer un fichier Excel avec toutes les métriques et recommandations. Le fichier sera prêt dans quelques instants.",
      date_time: "2024-01-18 16:46:22",
    },
  ],
};

/**
 * Helper pour obtenir un chat de meeting aléatoire
 */
export const getRandomChatMeetings = (): ListChatMeetingSchema => {
  const chatOptions = [
    fakeChatMeetings,
    fakeShortChatMeetings,
    fakeErrorChatMeetings,
    fakeTechnicalChatMeetings,
  ];

  const randomIndex = Math.floor(Math.random() * chatOptions.length);
  return chatOptions[randomIndex];
};

/**
 * Données factices pour les réponses de l'IA aux questions sur les meetings
 */
export const fakeResponseAskAiMeetings: ResponseAskAiMeetingSchema[] = [
  {
    data: {
      id: "ai-response-001",
      type: "AI",
      message:
        "Merci pour votre question ! Voici ma réponse basée sur l'analyse de la réunion :\n\n**Résumé de la question :** Quelles ont été les décisions clés de cette réunion ?\n\n**Réponse de l'IA :**\n• Discussion sur le nouveau projet MIZARU\n• Budget alloué : 150 000€\n• Échéance : 30 mars 2024\n• Responsable technique : Jean Dupont\n• Prochain point : 22 janvier 2024\n\nN'hésitez pas si vous avez d'autres questions !",
      date_time: "2024-01-15 14:30:25",
    },
  },
  {
    data: {
      id: "ai-response-002",
      type: "AI",
      message:
        "Excellente question ! Voici ce que j'ai identifié dans cette réunion :\n\n**Points clés identifiés :**\n• 5 participants présents\n• Durée : 1h 23min\n• 3 décisions importantes prises\n• 8 points d'action définis\n\n**Recommandations :**\n• Suivre les échéances définies\n• Organiser un point de suivi dans 2 semaines\n• Documenter les décisions prises\n\nY a-t-il autre chose que vous souhaitez savoir ?",
      date_time: "2024-01-15 14:32:18",
    },
  },
  {
    data: {
      id: "ai-response-003",
      type: "AI",
      message:
        "Parfait ! J'ai analysé l'enregistrement et voici mes observations :\n\n**Analyse des performances :**\n• Temps de parole équilibré entre les participants\n• 12 interruptions identifiées\n• 8 questions posées\n• 3 décisions finalisées\n\n**Recommandations d'amélioration :**\n• Structurer mieux les discussions\n• Préparer un agenda plus détaillé\n• Réduire les interruptions\n\nSouhaitez-vous que je génère un rapport détaillé ?",
      date_time: "2024-01-15 14:35:42",
    },
  },
  {
    data: {
      id: "ai-response-004",
      type: "AI",
      message:
        "Très bonne question ! Voici ce que j'ai trouvé :\n\n**Résumé exécutif :**\n• Réunion productive avec 5 participants\n• Objectifs atteints à 85%\n• 3 décisions stratégiques prises\n• Prochaines étapes clairement définies\n\n**Points d'attention :**\n• Certains sujets nécessitent un suivi\n• Budget à valider avec la direction\n• Échéances à respecter impérativement\n\nAvez-vous besoin de plus de détails sur un point spécifique ?",
      date_time: "2024-01-15 14:38:15",
    },
  },
  {
    data: {
      id: "ai-response-005",
      type: "AI",
      message:
        "Excellente question ! Voici mon analyse complète :\n\n**Synthèse de la réunion :**\n• **Participants :** 5 personnes (Jean, Marie, Pierre, Sophie, Marc)\n• **Durée :** 1h 23min\n• **Objectif :** Validation du projet MIZARU\n\n**Décisions prises :**\n✅ Approbation du budget de 150 000€\n✅ Validation de l'équipe technique\n✅ Définition des jalons principaux\n\n**Actions à suivre :**\n• Rédaction du cahier des charges (Jean)\n• Validation technique (Pierre)\n• Communication client (Marie)\n\nBesoin d'autres informations ?",
      date_time: "2024-01-15 14:41:33",
    },
  },
];

/**
 * Helper pour obtenir une réponse IA aléatoire
 */
export const getRandomResponseAskAi = (): ResponseAskAiMeetingSchema => {
  const randomIndex = Math.floor(
    Math.random() * fakeResponseAskAiMeetings.length
  );
  return fakeResponseAskAiMeetings[randomIndex];
};

/**
 * Helper pour obtenir une réponse IA par ID de message
 */
export const getResponseAskAiById = (
  messageId: string
): ResponseAskAiMeetingSchema | null => {
  const response = fakeResponseAskAiMeetings.find(
    (resp) => resp.data.id === messageId
  );
  return response || null;
};

/**
 * Helper pour simuler une réponse IA basée sur une question
 */
export const generateAiResponse = (
  question: string
): ResponseAskAiMeetingSchema => {
  const currentTime = new Date().toISOString().slice(0, 19).replace("T", " ");

  // Réponses contextuelles basées sur le contenu de la question
  let responseMessage = "";

  if (
    question.toLowerCase().includes("décision") ||
    question.toLowerCase().includes("décisions")
  ) {
    responseMessage = `Excellente question sur les décisions ! Voici ce que j'ai identifié :\n\n**Décisions clés de la réunion :**\n• Validation du budget de 150 000€\n• Approbation de l'équipe technique\n• Définition des jalons de livraison\n• Planification des revues de code\n\n**Impact de ces décisions :**\n• Projet lancé officiellement\n• Équipe mobilisée\n• Échéances fixées\n\nY a-t-il une décision spécifique qui vous intéresse ?`;
  } else if (
    question.toLowerCase().includes("participant") ||
    question.toLowerCase().includes("qui")
  ) {
    responseMessage = `Voici les informations sur les participants :\n\n**Participants présents :**\n• Jean Dupont - Chef de projet\n• Marie Martin - Responsable technique\n• Pierre Durand - Développeur senior\n• Sophie Leroy - UX Designer\n• Marc Petit - Product Owner\n\n**Rôles et contributions :**\n• Jean : Animation et coordination\n• Marie : Validation technique\n• Pierre : Architecture et développement\n• Sophie : Interface utilisateur\n• Marc : Vision produit\n\nSouhaitez-vous plus de détails sur un participant ?`;
  } else if (
    question.toLowerCase().includes("budget") ||
    question.toLowerCase().includes("coût")
  ) {
    responseMessage = `Voici les informations budgétaires :\n\n**Budget alloué :** 150 000€\n\n**Répartition prévue :**\n• Développement : 60% (90 000€)\n• Design : 20% (30 000€)\n• Tests : 15% (22 500€)\n• Gestion de projet : 5% (7 500€)\n\n**Échéances de paiement :**\n• 30% à la signature (45 000€)\n• 40% à mi-parcours (60 000€)\n• 30% à la livraison (45 000€)\n\nAvez-vous des questions sur la répartition ?`;
  } else {
    responseMessage = `Merci pour votre question : "${question}"\n\nVoici ma réponse basée sur l'analyse de la réunion :\n\n**Analyse générale :**\n• Réunion productive de 1h 23min\n• 5 participants engagés\n• Objectifs atteints\n\n**Points clés identifiés :**\n• Discussion constructive\n• Décisions prises\n• Actions définies\n\n**Recommandations :**\n• Suivre les échéances\n• Maintenir la communication\n• Documenter les décisions\n\nN'hésitez pas si vous avez d'autres questions !`;
  }

  return {
    data: {
      id: `ai-response-${Date.now()}`,
      type: "AI",
      message: responseMessage,
      date_time: currentTime,
    },
  };
};

/**
 * Helper pour obtenir un chat de meeting par ID de meeting
 */
export const getChatMeetingsByMeetingId = (
  meetingId: string
): ListChatMeetingSchema => {
  // Simulation d'une logique de récupération par ID
  switch (meetingId) {
    case "meeting-001":
      return fakeChatMeetings;
    case "meeting-002":
      return fakeShortChatMeetings;
    case "meeting-003":
      return fakeErrorChatMeetings;
    case "meeting-004":
      return fakeTechnicalChatMeetings;
    default:
      return fakeChatMeetings;
  }
};
