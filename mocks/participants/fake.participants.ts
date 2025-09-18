import {
  ListParticipants,
  Participant,
} from "@/validators/participants/validator.list-participants";

/**
 * Données factices pour une liste de participants
 */
export const fakeParticipantsList: ListParticipants = {
  data: [
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
    {
      id: "5",
      name: "Alexandre Moreau",
      type: "EXTERNE",
    },
  ],
};

/**
 * Données factices pour une liste de participants avec un seul participant
 */
export const fakeSingleParticipant: ListParticipants = {
  data: [
    {
      id: "1",
      name: "Jean-Louis Dikasa",
      type: "INTERNE",
    },
  ],
};

/**
 * Données factices pour une liste de participants externes uniquement
 */
export const fakeExternalParticipants: ListParticipants = {
  data: [
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
    {
      id: "12",
      name: "Fournisseur DEF",
      type: "EXTERNE",
    },
  ],
};

/**
 * Données factices pour une liste de participants internes uniquement
 */
export const fakeInternalParticipants: ListParticipants = {
  data: [
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
      id: "23",
      name: "Designer UX/UI",
      type: "INTERNE",
    },
  ],
};

/**
 * Données factices pour les tests de validation
 */
export const fakeParticipantsForTesting: ListParticipants = {
  data: [
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
};

/**
 * Données factices pour un participant individuel
 */
export const fakeParticipant: Participant = {
  id: "1",
  name: "Jean-Louis Dikasa",
  type: "INTERNE",
};

/**
 * Données factices pour un participant externe
 */
export const fakeExternalParticipant: Participant = {
  id: "10",
  name: "Client ABC",
  type: "EXTERNE",
};
