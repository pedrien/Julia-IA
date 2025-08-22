import { DefaultUser, DefaultJWT } from "next-auth";

declare module "next-auth" {
  interface Session {
    id: string | null;
    username: string;
    email: string | null;
    name: string;
    avatar: string | null;
    is_active: boolean;
    last_login_at: string | null;
    created_at: string;
    token: {
      access_token: string;
      expire_at: string;
    };
  }

  interface User extends DefaultUser {
    id: string | null;
    username: string;
    email: string | null;
    name: string;
    avatar: string | null;
    is_active: boolean;
    last_login_at: string | null;
    created_at: string;
    token: {
      access_token: string;
      expire_at: string;
    };
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id: string | null;
    username: string;
    email: string | null;
    name: string;
    avatar: string | null;
    is_active: boolean;
    last_login_at: string | null;
    created_at: string;
    token: {
      access_token: string;
      expire_at: string;
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
