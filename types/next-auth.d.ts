import { DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    username: string;
    email: string | null;
    name: string;
    avatar: string | null;
    is_active: boolean;
    last_login_at: string | null;
    created_at: string;
    token: {
      access_token: string;
      expires_at: number;
    };
  }

  interface User extends DefaultUser {
    username: string;
    email: string | null;
    name: string;
    avatar: string | null;
    is_active: boolean;
    last_login_at: string | null;
    created_at: string;
    token: {
      access_token: string;
      expires_at: number; // Changed from string to number to match auth.ts
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    username: string;
    email: string | null;
    name: string;
    avatar: string | null;
    is_active: boolean;
    last_login_at: string | null;
    created_at: string;
    token: {
      access_token: string;
      expires_at: number; // Changed from string to number to match auth.ts
    };
  }
}

declare module "next-auth/middleware" {
  interface NextAuthRequest extends Request {
    auth: {
      token?: JWT;
      // Autres propriétés si nécessaire
    };
  }
}
