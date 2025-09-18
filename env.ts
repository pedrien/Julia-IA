import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const ENV = createEnv({
  server: {
    APP_BASE_URL: z.string().url(),
    API_BASE_URL: z.string().min(1),
    NEXTAUTH_URL: z.string().url(),
    AUTH_SECRET: z.string().min(1),
    EXPIRATION_TIME_SESSION: z.string().min(1),
    AUTH_TRUST_HOST: z.string().url(),
    FIREBASE_API_KEY: z.string().min(1),
    FIREBASE_AUTH_DOMAINE: z.string().min(1),
    FIREBASE_PROJECT_ID: z.string().min(1),
    FIREBASE_STORAGE_BUCKET: z.string().min(1),
    FIREBASE_MESSAGING_SENDER_ID: z.string().min(1),
    FIREBASE_APP_ID: z.string().min(1),
    FIREBASE_MEASUREMENT_ID: z.string().min(1),
    API_LOCAL_BASE_URL: z.string().min(1),
    APP_ENV: z.string().min(1).nonempty(),
    TOKEN_ENCRYPTION_KEY: z.string().min(1),
  },
  client: {
    NEXT_PUBLIC_APP_BASE_URL: z.string().url(),
    NEXT_PUBLIC_API_URL: z.string().url(),
    NEXT_PUBLIC_BASED_API_URL: z.string().url(),
  },

  experimental__runtimeEnv: {
    NEXT_PUBLIC_APP_BASE_URL: process.env.NEXT_PUBLIC_APP_BASE_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_BASED_API_URL: process.env.NEXT_PUBLIC_BASED_API_URL,
  },
});
