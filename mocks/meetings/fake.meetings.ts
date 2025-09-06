import {
  listMeetingSchema,
  meetingSchema,
} from "@/validators/meetings/validator.list-meeting";

/**
 * Données factices pour une liste de meetings
 */
export const fakeMeetingsList: listMeetingSchema = {
  data: [
    {
      id: "1",
      title: "Réunion de planification Q1",
      total_participants: 5,
      date_meeting: "2024-01-15",
      duration: 120,
      status: "EN_ATTENTE",
    },
    {
      id: "2",
      title: "Présentation projet ABC",
      total_participants: 8,
      date_meeting: "2024-01-20",
      duration: 90,
      status: "EN_COURS",
    },
    {
      id: "3",
      title: "Revue de code équipe",
      total_participants: 4,
      date_meeting: "2024-01-18",
      duration: 60,
      status: "TRAITE",
    },
    {
      id: "4",
      title: "Formation nouveaux outils",
      total_participants: 12,
      date_meeting: "2024-01-25",
      duration: 180,
      status: "EN_ATTENTE",
    },
    {
      id: "5",
      title: "Réunion client XYZ",
      total_participants: 6,
      date_meeting: "2024-01-22",
      duration: 75,
      status: "LU",
    },
    {
      id: "6",
      title: "Stand-up quotidien",
      total_participants: 7,
      date_meeting: "2024-01-23",
      duration: 30,
      status: "EN_COURS",
    },
    {
      id: "7",
      title: "Rétrospective sprint",
      total_participants: 9,
      date_meeting: "2024-01-19",
      duration: 90,
      status: "TRAITE",
    },
    {
      id: "8",
      title: "Réunion stratégique",
      total_participants: 15,
      date_meeting: "2024-01-26",
      duration: 150,
      status: "EN_ATTENTE",
    },
    {
      id: "9",
      title: "Formation sécurité",
      total_participants: 20,
      date_meeting: "2024-01-17",
      duration: 120,
      status: "LU",
    },
    {
      id: "10",
      title: "Réunion technique",
      total_participants: 6,
      date_meeting: "2024-01-24",
      duration: 45,
      status: "EN_COURS",
    },
  ],
};

/**
 * Données factices pour une liste de meetings avec un seul meeting
 */
export const fakeSingleMeeting: listMeetingSchema = {
  data: [
    {
      id: "1",
      title: "Réunion de planification Q1",
      total_participants: 5,
      date_meeting: "2024-01-15",
      duration: 120,
      status: "EN_ATTENTE",
    },
  ],
};

/**
 * Données factices pour une liste de meetings en attente uniquement
 */
export const fakePlannedMeetings: listMeetingSchema = {
  data: [
    {
      id: "10",
      title: "Réunion stratégique",
      total_participants: 10,
      date_meeting: "2024-02-01",
      duration: 150,
      status: "EN_ATTENTE",
    },
    {
      id: "11",
      title: "Formation équipe",
      total_participants: 15,
      date_meeting: "2024-02-05",
      duration: 240,
      status: "EN_ATTENTE",
    },
    {
      id: "12",
      title: "Présentation résultats",
      total_participants: 20,
      date_meeting: "2024-02-10",
      duration: 90,
      status: "EN_ATTENTE",
    },
  ],
};

/**
 * Données factices pour une liste de meetings traités uniquement
 */
export const fakeCompletedMeetings: listMeetingSchema = {
  data: [
    {
      id: "20",
      title: "Réunion hebdomadaire",
      total_participants: 6,
      date_meeting: "2024-01-10",
      duration: 60,
      status: "TRAITE",
    },
    {
      id: "21",
      title: "Revue de projet",
      total_participants: 8,
      date_meeting: "2024-01-12",
      duration: 90,
      status: "TRAITE",
    },
    {
      id: "22",
      title: "Formation technique",
      total_participants: 12,
      date_meeting: "2024-01-08",
      duration: 180,
      status: "TRAITE",
    },
  ],
};

/**
 * Données factices pour les tests de validation
 */
export const fakeMeetingsForTesting: listMeetingSchema = {
  data: [
    {
      id: "test_1",
      title: "Test Meeting 1",
      total_participants: 3,
      date_meeting: "2024-01-01",
      duration: 30,
      status: "EN_ATTENTE",
    },
    {
      id: "test_2",
      title: "Test Meeting 2",
      total_participants: 5,
      date_meeting: "2024-01-02",
      duration: 45,
      status: "EN_COURS",
    },
  ],
};

/**
 * Données factices pour un meeting individuel
 */
export const fakeMeeting: meetingSchema = {
  id: "1",
  title: "Réunion de planification Q1",
  total_participants: 5,
  date_meeting: "2024-01-15",
  duration: 120,
  status: "EN_ATTENTE",
};

/**
 * Données factices pour un meeting en cours
 */
export const fakeInProgressMeeting: meetingSchema = {
  id: "2",
  title: "Présentation projet ABC",
  total_participants: 8,
  date_meeting: "2024-01-20",
  duration: 90,
  status: "EN_COURS",
};
