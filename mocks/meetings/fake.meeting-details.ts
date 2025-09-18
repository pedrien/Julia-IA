import {
  MeetingParticipantList,
  DetailMeeting,
  MeetingTranscriptText,
  MeetingDocument,
} from "@/validators/meetings/validator.detail-meetings";
import { MeetingRecordingDetail } from "@/validators/meetings/validator.meeting-recording-detail";
import { ListOberservationParticipants } from "@/validators/participants/validator.list-oberservation-participants";

/**
 * Données factices pour les participants d'une réunion
 */
export const fakeMeetingParticipants: MeetingParticipantList = {
  participants: [
    {
      id: "1",
      name: "Jean-Louis Dikasa",
      email: "jean-louis.dikasa@company.com",
      phone: "+33 6 12 34 56 78",
      has_processed_report: true,
      has_read_report: true,
      processed_date: "2024-01-15 10:00:00",
      read_date: "2024-01-15 10:00:00",
      type: "INTERNE",
    },
    {
      id: "2",
      name: "Marie Dubois",
      email: "marie.dubois@company.com",
      phone: "+33 6 23 45 67 89",
      has_processed_report: false,
      has_read_report: true,
      processed_date: null,
      read_date: "2024-01-15 10:00:00",
      type: "INTERNE",
    },
    {
      id: "3",
      name: "Pierre Martin",
      email: "pierre.martin@company.com",
      phone: "+33 6 34 56 78 90",
      has_processed_report: true,
      has_read_report: false,
      processed_date: "2024-01-15 10:00:00",
      read_date: null,
      type: "INTERNE",
    },
  ],
  guest_participants: [
    {
      id: "4",
      name: "Sophie Laurent",
      email: "sophie.laurent@client.com",
      phone: "+33 6 45 67 89 01",
      has_processed_report: false,
      has_read_report: false,
      processed_date: null,
      read_date: null,
      type: "EXTERNE",
    },
    {
      id: "5",
      name: "Alexandre Moreau",
      email: "alexandre.moreau@partner.com",
      phone: "+33 6 56 78 90 12",
      has_processed_report: true,
      has_read_report: true,
      processed_date: "2024-01-15 10:00:00",
      read_date: "2024-01-15 10:00:00",
      type: "EXTERNE",
    },
  ],
};

/**
 * Données factices pour la transcription d'une réunion
 */
export const fakeMeetingTranscription: MeetingTranscriptText = {
  text: `Bonjour tout le monde, bienvenue à cette réunion de planification du premier trimestre. Je suis Jean-Louis Dikasa, et je vais animer cette session.

Nous avons plusieurs points importants à aborder aujourd'hui :
1. Revue des objectifs du trimestre précédent
2. Planification des nouveaux projets
3. Allocation des ressources
4. Questions diverses

Commençons par la revue des objectifs. Marie, peux-tu nous faire un point sur les résultats du dernier trimestre ?

Marie : Merci Jean-Louis. Nous avons atteint 85% de nos objectifs trimestriels. Les principaux succès incluent la finalisation du projet ABC et l'amélioration de notre taux de satisfaction client de 15%.

Pierre : J'aimerais ajouter que nous avons également réduit nos coûts opérationnels de 10% grâce à l'optimisation des processus.

Sophie (Client) : C'est très encourageant. Nous sommes satisfaits de la qualité du travail fourni et nous aimerions continuer cette collaboration.

Alexandre (Partenaire) : De notre côté, nous sommes prêts à soutenir les nouveaux projets avec nos équipes techniques.

Jean-Louis : Excellent. Passons maintenant à la planification des nouveaux projets. Nous avons identifié trois initiatives prioritaires pour ce trimestre...`,
};

/**
 * Données factices pour les détails d'une réunion
 */
export const fakeMeetingDetail: DetailMeeting = {
  id: "1",
  title: "Réunion de planification Q1",
  total_participants: 5,
  date_meeting: "2024-01-15",
  duration: 120,
  status: "TRAITE",
};

/**
 * Données factices pour les documents d'une réunion
 */
export const fakeMeetingDocument: MeetingDocument = {
  url_recording: "recordings/meeting-1-2024-01-15.mp3",
  url_report: "reports/meeting-1-2024-01-15.pdf",
};

/**
 * Données factices pour une réunion en cours
 */
export const fakeInProgressMeetingDetail: DetailMeeting = {
  id: "2",
  title: "Présentation projet ABC",
  total_participants: 8,
  date_meeting: "2024-01-20",
  duration: 90,
  status: "EN_COURS",
};

/**
 * Données factices pour une réunion en attente
 */
export const fakePendingMeetingDetail: DetailMeeting = {
  id: "3",
  title: "Revue de code équipe",
  total_participants: 4,
  date_meeting: "2024-01-18",
  duration: 60,
  status: "EN_ATTENTE",
};

/**
 * Données factices pour les participants d'une réunion en cours
 */
export const fakeInProgressMeetingParticipants: MeetingParticipantList = {
  participants: [
    {
      id: "6",
      name: "Directeur Général",
      email: "dg@company.com",
      phone: "+33 6 11 22 33 44",
      has_processed_report: false,
      has_read_report: false,
      processed_date: null,
      read_date: null,
      type: "INTERNE",
    },
    {
      id: "7",
      name: "Chef de Projet",
      email: "chef.projet@company.com",
      phone: "+33 6 22 33 44 55",
      has_processed_report: false,
      has_read_report: false,
      processed_date: null,
      read_date: null,
      type: "INTERNE",
    },
  ],
  guest_participants: [
    {
      id: "8",
      name: "Client Principal",
      email: "client@external.com",
      phone: "+33 6 33 44 55 66",
      has_processed_report: false,
      has_read_report: false,
      processed_date: null,
      read_date: null,
      type: "EXTERNE",
    },
  ],
};

/**
 * Données factices pour la transcription d'une réunion en cours
 */
export const fakeInProgressMeetingTranscription: MeetingTranscriptText = {
  text: `Réunion en cours - Transcription en temps réel...

Directeur Général : Bonjour à tous, nous sommes ici pour discuter de l'avancement du projet ABC.

Chef de Projet : Merci d'être présents. Nous avons fait des progrès significatifs cette semaine...

[Transcription en cours...]`,
};

/**
 * Données factices pour les documents d'une réunion en cours
 */
export const fakeInProgressMeetingDocument: MeetingDocument = {
  url_recording: "https://example.com/recordings/meeting-2-live.mp4",
  url_report: "", // Pas encore généré
};

/**
 * Données factices pour les détails de réunion d'enregistrement
 */
export const fakeMeetingDetailRecording: MeetingRecordingDetail = {
  data: {
    id: "1",
    title: "Réunion de planification Q1",
    description:
      "Réunion de planification pour le premier trimestre 2024. Nous allons discuter des objectifs, des projets prioritaires et de l'allocation des ressources.",
    scheduled_start_time: "2024-01-15 10:00:00",
    location: "Salle de conférence A - Bâtiment principal",
    participants: [
      {
        id: "1",
        name: "Jean-Louis Dikasa",
        type: "INTERNE",
      },
      {
        id: "2",
        name: "Marie Dubois",
        type: "INTERNE",
      },
      {
        id: "3",
        name: "Pierre Martin",
        type: "INTERNE",
      },
      {
        id: "4",
        name: "Sophie Laurent",
        type: "EXTERNE",
      },
      {
        id: "5",
        name: "Alexandre Moreau",
        type: "EXTERNE",
      },
    ],
  },
};

/**
 * Données factices pour les observations des participants d'une réunion
 */
export const fakeMeetingParticipantObservations: ListOberservationParticipants =
  {
    data: [
      {
        id: "obs-1",
        content:
          "Jean-Louis a été très proactif dans la discussion sur l'architecture du système. Il a proposé des solutions innovantes pour optimiser les performances.",
        date_time: "2024-01-15 10:15:30",
      },
      {
        id: "obs-2",
        content:
          "Marie a posé des questions pertinentes sur la sécurité des données. Elle a montré une excellente compréhension des enjeux techniques.",
        date_time: "2024-01-15 10:32:45",
      },
      {
        id: "obs-3",
        content:
          "Pierre a partagé son expérience sur un projet similaire. Ses retours d'expérience ont été très utiles pour l'équipe.",
        date_time: "2024-01-15 10:45:12",
      },
      {
        id: "obs-4",
        content:
          "Sophie (Client) a exprimé ses préoccupations concernant les délais de livraison. Elle a demandé des clarifications sur le planning.",
        date_time: "2024-01-15 11:02:18",
      },
      {
        id: "obs-5",
        content:
          "Alexandre (Partenaire) a proposé des ressources supplémentaires pour accélérer le développement. Engagement très positif.",
        date_time: "2024-01-15 11:18:33",
      },
      {
        id: "obs-6",
        content:
          "Jean-Louis a pris l'initiative de planifier une réunion de suivi pour la semaine prochaine. Leadership naturel.",
        date_time: "2024-01-15 11:35:27",
      },
      {
        id: "obs-7",
        content:
          "Marie a créé un document de synthèse des décisions prises. Très organisée et méthodique.",
        date_time: "2024-01-15 11:42:15",
      },
      {
        id: "obs-8",
        content:
          "Pierre a identifié un risque potentiel sur la compatibilité des APIs. Excellente analyse technique.",
        date_time: "2024-01-15 11:55:41",
      },
    ],
  };

/**
 * Fonction pour filtrer les observations par participant
 */
export const getParticipantObservations = (
  participantId: string
): ListOberservationParticipants => {
  // Simulation de filtrage par participant
  const participantObservations = {
    "1": [
      // Jean-Louis
      {
        id: "obs-1",
        content:
          "Jean-Louis a été très proactif dans la discussion sur l'architecture du système. Il a proposé des solutions innovantes pour optimiser les performances.",
        date_time: "2024-01-15 10:15:30",
      },
      {
        id: "obs-6",
        content:
          "Jean-Louis a pris l'initiative de planifier une réunion de suivi pour la semaine prochaine. Leadership naturel.",
        date_time: "2024-01-15 11:35:27",
      },
    ],
    "2": [
      // Marie
      {
        id: "obs-2",
        content:
          "Marie a posé des questions pertinentes sur la sécurité des données. Elle a montré une excellente compréhension des enjeux techniques.",
        date_time: "2024-01-15 10:32:45",
      },
      {
        id: "obs-7",
        content:
          "Marie a créé un document de synthèse des décisions prises. Très organisée et méthodique.",
        date_time: "2024-01-15 11:42:15",
      },
    ],
    "3": [
      // Pierre
      {
        id: "obs-3",
        content:
          "Pierre a partagé son expérience sur un projet similaire. Ses retours d'expérience ont été très utiles pour l'équipe.",
        date_time: "2024-01-15 10:45:12",
      },
      {
        id: "obs-8",
        content:
          "Pierre a identifié un risque potentiel sur la compatibilité des APIs. Excellente analyse technique.",
        date_time: "2024-01-15 11:55:41",
      },
    ],
    "4": [
      // Sophie (Client)
      {
        id: "obs-4",
        content:
          "Sophie (Client) a exprimé ses préoccupations concernant les délais de livraison. Elle a demandé des clarifications sur le planning.",
        date_time: "2024-01-15 11:02:18",
      },
    ],
    "5": [
      // Alexandre (Partenaire)
      {
        id: "obs-5",
        content:
          "Alexandre (Partenaire) a proposé des ressources supplémentaires pour accélérer le développement. Engagement très positif.",
        date_time: "2024-01-15 11:18:33",
      },
    ],
  };

  return {
    data:
      participantObservations[
        participantId as keyof typeof participantObservations
      ] || [],
  };
};
