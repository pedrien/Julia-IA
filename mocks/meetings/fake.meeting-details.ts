import {
  MeetingRecordingDetail,
  MeetingParticipant,
} from "@/validators/meetings/validator.meeting-recording-detail";

/**
 * Données factices pour les détails d'une réunion avec participants
 */
export const fakeMeetingDetailRecording: MeetingRecordingDetail = {
  data: {
    id: "123",
    title: "Réunion de planification Q4",
    description:
      "Discussion sur les objectifs et stratégies pour le quatrième trimestre",
    scheduled_start_time: "2025-01-15 14:30:00",
    location: "Salle de conférence A",
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
        type: "EXTERNE",
      },
      {
        id: "4",
        name: "Sophie Laurent",
        type: "INTERNE",
      },
    ],
  },
};

/**
 * Données factices pour une réunion avec un seul participant
 */
export const fakeMeetingDetailSingleParticipant: MeetingRecordingDetail = {
  data: {
    id: "456",
    title: "Réunion individuelle",
    description: "Entretien individuel avec un collaborateur",
    scheduled_start_time: "2025-01-16 10:00:00",
    location: "Bureau privé",
    participants: [
      {
        id: "1",
        name: "Jean-Louis Dikasa",
        type: "INTERNE",
      },
    ],
  },
};

/**
 * Données factices pour une réunion avec participants externes uniquement
 */
export const fakeMeetingDetailRecordingExternalOnly: MeetingRecordingDetail = {
  data: {
    id: "789",
    title: "Réunion client",
    description: "Présentation du projet au client",
    scheduled_start_time: "2025-01-17 15:00:00",
    location: "Salle de réunion virtuelle",
    participants: [
      {
        id: "10",
        name: "Client ABC",
        type: "EXTERNE",
      },
      {
        id: "11",
        name: "Partenaire XYZ",
        type: "EXTERNE",
      },
    ],
  },
};

/**
 * Données factices pour une réunion mixte (interne + externe)
 */
export const fakeMeetingDetailRecordingMixed: MeetingRecordingDetail = {
  data: {
    id: "101",
    title: "Réunion projet",
    description: "Point d'avancement avec l'équipe et les partenaires",
    scheduled_start_time: "2025-01-18 09:30:00",
    location: "Salle de conférence B",
    participants: [
      {
        id: "20",
        name: "Directeur Général",
        type: "INTERNE",
      },
      {
        id: "21",
        name: "Chef de Projet",
        type: "INTERNE",
      },
      {
        id: "22",
        name: "Développeur Senior",
        type: "INTERNE",
      },
      {
        id: "12",
        name: "Fournisseur DEF",
        type: "EXTERNE",
      },
    ],
  },
};

/**
 * Données factices pour les tests de validation
 */
export const fakeMeetingDetailForTesting: MeetingRecordingDetail = {
  data: {
    id: "test_meeting_123",
    title: "Test Meeting",
    description: "Réunion de test pour validation",
    scheduled_start_time: "2025-01-20 12:00:00",
    location: "Salle de test",
    participants: [
      {
        id: "test_1",
        name: "Test User 1",
        type: "INTERNE",
      },
      {
        id: "test_2",
        name: "Test User 2",
        type: "EXTERNE",
      },
    ],
  },
};

/**
 * Données factices pour un participant individuel
 */
export const fakeMeetingParticipant: MeetingParticipant = {
  id: "1",
  name: "Jean-Louis Dikasa",
  type: "INTERNE",
};

/**
 * Données factices pour un participant externe
 */
export const fakeExternalMeetingParticipant: MeetingParticipant = {
  id: "10",
  name: "Client ABC",
  type: "EXTERNE",
};
