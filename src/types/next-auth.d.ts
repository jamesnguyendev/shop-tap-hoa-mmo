import { DefaultUser } from "next-auth";

declare module "next-auth" {
  interface Session {
    accessToken?: string;
    provider?: string;
    idToken?: string;
    user?: {
      id?: string;
      email?: string;
      name?: string;
    };
  }

  interface User extends DefaultUser {
    access_token?: string;
    id?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    provider?: string;
    idToken?: string;
    id?: string;
    user?: {
      id?: string;
      email?: string;
      name?: string;
    };
  }
}
