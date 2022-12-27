import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    idToken: string;
    issuer: string;
    error: string;
    username: string;  
    refreshToken: string; 
    publicApi: string;
    publicDomain: string;
    collectionARN: string;
    prefix: string;
    data: string[];
    body: string;
    items: string;
  }

  interface Profile {
    groups: string[];
    iss: string;
    signed_tac: string;
  }

  interface Center {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    id_token: string;
     data: string[];
    body: string;
    items: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    profile?: any;
    accessToken: string;
    refreshAccessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    idToken: string;
    username: string;  
    refresh_token: string;

  }
}
