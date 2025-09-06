import {
  MeetingParticipantList,
  DetailMeeting,
  MeetingTranscriptText,
  MeetingDocument,
} from "@/validators/meetings/validator.detail-meetings";
import { MeetingRecordingDetail } from "@/validators/meetings/validator.meeting-recording-detail";

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
      type: "INTERNE",
    },
    {
      id: "2",
      name: "Marie Dubois",
      email: "marie.dubois@company.com",
      phone: "+33 6 23 45 67 89",
      has_processed_report: false,
      has_read_report: true,
      type: "INTERNE",
    },
    {
      id: "3",
      name: "Pierre Martin",
      email: "pierre.martin@company.com",
      phone: "+33 6 34 56 78 90",
      has_processed_report: true,
      has_read_report: false,
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
      type: "EXTERNE",
    },
    {
      id: "5",
      name: "Alexandre Moreau",
      email: "alexandre.moreau@partner.com",
      phone: "+33 6 56 78 90 12",
      has_processed_report: true,
      has_read_report: true,
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
  url_recording: "http://localhost:4000/recordings/meeting-1-2024-01-15.mp4",
  url_report: "http://localhost:4000/reports/meeting-1-2024-01-15.pdf",
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
      type: "INTERNE",
    },
    {
      id: "7",
      name: "Chef de Projet",
      email: "chef.projet@company.com",
      phone: "+33 6 22 33 44 55",
      has_processed_report: false,
      has_read_report: false,
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
