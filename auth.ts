import NextAuth, {
  AuthError,
  CredentialsSignin,
  NextAuthConfig,
  Session,
  User,
} from "next-auth";

import axios from "axios";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import { validateApiResponse } from "./libs/validateApiResponse";
import { SessionApp, SessionSchema } from "./validators/auth/validator.session";
import { convertExpiresInToSeconds } from "./utils/utils.times";
import { ENV } from "./env";
import { encryptToken } from "./libs/cryptoToken";
import { fakeSessionUser } from "./mocks/session/fake.session-user";

// Constants
const PROVIDER = "GOOGLE";
const LOGIN_URL = `${ENV.API_BASE_URL}auth/login`;
const SESSION_EXPIRATION = convertExpiresInToSeconds(
  ENV.EXPIRATION_TIME_SESSION
);

// Helper to extract error message from axios error
function extractAuthError(error: unknown): AuthError {
  const axiosError = error as {
    response?: {
      data?: { message?: string; code?: string };
    };
  };
  const customError = new AuthError(
    axiosError.response?.data?.message || "Failed to login"
  );
  customError.name = axiosError.response?.data?.code || "CustomAuthError";
  return customError;
}

const config = {
  providers: [
    Credentials({
      credentials: {
        username: {},
        otp: {},
      },
      authorize: async (credentials) => {
        console.log("credentials", credentials);
        const username = credentials.username as string | undefined;
        const otp = credentials.otp as string | undefined;

        if (!username || !otp) {
          throw new CredentialsSignin("Please provide both username and otp");
        }
        const body = {
          username,
          otp,
          provider: PROVIDER,
        };

        try {
          // const requestAuthCredential = await axios.post(LOGIN_URL, body);

          // if (requestAuthCredential.status !== 200) {
          //   throw new AuthError("Please provide both username & otp");
          // }

          const response = fakeSessionUser;

          const session: SessionApp = validateApiResponse(
            response,
            SessionSchema
          );

          // Set token expiration 30 minutes before actual expiry
          const expireDate = new Date(response.data.token.expire_at);
          expireDate.setMinutes(expireDate.getMinutes() - 30);

          const encryptedToken: string = await encryptToken(
            response.data.token.access_token
          );

          return {
            username: session.user.data.username,
            email: session.user.data.email,
            name: session.user.data.name,
            avatar: session.user.data.avatar,
            is_active: session.user.data.is_active,
            last_login_at: session.user.data.last_login_at,
            created_at: session.user.data.created_at,
            token: {
              access_token: encryptedToken,
              expires_at: expireDate.getTime(),
            },
          };
        } catch (error: unknown) {
          throw extractAuthError(error);
        }
      },
    }),
  ],
  pages: {
    signIn: "/login",
    error: "/login",
  },
  session: {
    strategy: "jwt",
    maxAge: SESSION_EXPIRATION,
  },
  callbacks: {
    // Always authorize
    authorized() {
      return true;
    },
    // Always allow sign in
    async signIn() {
      return true;
    },
    // Handle JWT token creation and updates
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: JWT;
      user?: User;
      trigger?: unknown;
      session?: Session;
    }) {
      if (user) {
        token = {
          ...token,
          ...user,
          username: user.name ?? "",
          image: user.image ?? "",
          email: user.email ?? "",
        };
      }
      if (trigger === "update" && session) {
        token = {
          ...token,
          ...session,
        };
      }
      return token;
    },
    // Attach token data to session
    async session({ session, token }: { session: Session; token: JWT }) {
      if (token) {
        session = {
          ...session,
          ...token,
        };
      }
      return session;
    },
  },
} satisfies NextAuthConfig;

export const {
  handlers,
  auth,
  signIn,
  signOut,
  unstable_update: update,
} = NextAuth(config);
