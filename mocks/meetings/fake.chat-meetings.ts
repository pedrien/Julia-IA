import { ListChatMeetingSchema } from "@/validators/meetings/validator.list-chat-meetings";

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
