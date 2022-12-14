import NextAuth, { DefaultSession } from 'next-auth';
import { JWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    accessToken: string;
    idToken: string;
    issuer: string;
    user: {
      id: string;
      groups: string[];
      signedTac: string;
    } & DefaultSession['user'];
    publicApi: string;
    publicDomain: string;
    collectionARN: string;
    prefix: string;
  }

  interface Profile {
    groups: string[];
    iss: string;
    signed_tac: string;
  }

  interface Account {
    access_token: string;
    expires_at: number;
    refresh_token: string;
    id_token: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    profile?: any;
    accessToken: string;
    accessTokenExpires: number;
    refreshToken: string;
    idToken: string;
      username; string;  
      refreshAccessToken
      
  }
}
