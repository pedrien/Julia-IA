import { ApiResponse } from "@/validators/auth/validator.session";

export const fakeSessionUser: ApiResponse = {
  data: {
    token: {
      access_token: "eyJpdiI6Ik5uRzNYclNEVWttR2RGU1VWRWJNWGc9PSIsInZhbH==",
      expire_at: "2025-09-20 18:10:39",
    },
    user: {
      data: {
        id: "1",
        username: "jdikasa",
        email: "jean-louis.dikasa@example.com",
        name: "Jean-Louis Dikasa",
        avatar: "https://example.com/avatars/jdikasa.jpg",
        is_active: true,
        last_login_at: "2025-08-21 18:07:45",
        created_at: "2025-08-21 18:07:45",
      },
    },
  },
};

// Données factices alternatives pour les tests
export const fakeSessionUserWithoutAvatar: ApiResponse = {
  data: {
    token: {
      access_token: "eyJpdiI6Ik5uRzNYclNEVWttR2RGU1VWRWJNWGc9PSIsInZhbH==",
      expire_at: "2025-09-20 18:10:39",
    },
    user: {
      data: {
        id: null,
        username: "testuser",
        email: null,
        name: "Test User",
        avatar: null,
        is_active: true,
        last_login_at: null,
        created_at: "2025-08-21 18:07:45",
      },
    },
  },
};

// Données factices pour un utilisateur inactif
export const fakeInactiveSessionUser: ApiResponse = {
  data: {
    token: {
      access_token: "eyJpdiI6Ik5uRzNYclNEVWttR2RGU1VWRWJNWGc9PSIsInZhbH==",
      expire_at: "2025-09-20 18:10:39",
    },
    user: {
      data: {
        id: "2",
        username: "inactiveuser",
        email: "inactive@example.com",
        name: "Inactive User",
        avatar: null,
        is_active: false,
        last_login_at: "2025-08-15 10:30:00",
        created_at: "2025-08-10 12:00:00",
      },
    },
  },
};

// Données factices pour les tests de validation
export const fakeSessionUserForTesting = {
  data: {
    token: {
      access_token: "test_access_token_12345",
      expire_at: "2025-12-31 23:59:59",
    },
    user: {
      data: {
        id: "test_id_123",
        username: "testuser123",
        email: "test@example.com",
        name: "Test User 123",
        avatar: "https://example.com/avatar.jpg",
        is_active: true,
        last_login_at: "2025-08-21 15:30:00",
        created_at: "2025-08-01 09:00:00",
      },
    },
  },
};
