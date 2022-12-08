import { Session } from "inspector";
import NextAuth from "next-auth"
import { JWT } from "next-auth/jwt";
import SpotifyProvider from "next-auth/providers/spotify"
import spotifyApi, { LOGIN_URL } from "../../../lib/spotify"

async function refreshAccessToken({token}: any) {
    try {

        spotifyApi.setAccessToken(token.accessToken);
        spotifyApi.setRefreshToken(token.refreshAccessToken);

        const { body: refreshedToken } = await spotifyApi.refreshAccessToken();
        console.log("REFRESHED TOKEN IS", refreshedToken);

        return {
            ...token,
            accessTokenExpires: Date.now() + refreshedToken.expires_in * 1000,
            refreshedToken: refreshedToken.refresh_token ?? token.refresh_token,
        }

    } catch (error) {
        console.error(error)
        return {
            ...token,
            error: 'RefreshAccessToken'
        }
    }
    
}

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    SpotifyProvider({
      clientId: process.env.NEXT_PUBLIC_CLIENT_ID!,
      clientSecret: process.env.NEXT_PUBLIC_CLIENT_SECRET!,
      authorization: LOGIN_URL,
      
    }),
    // ...add more providers here
    ],
    secret: process.env.JWT_SECRET,
    pages: {
        signIn: '/login',
        signOut: '/login',
    },
    callbacks: {
        async jwt({ token, account, user }: any) {

            // initial sign in
                if(account && user) {
                    return {
                        ...token,
                        accessToken: account.access_token,
                        refreshToken: account.refresh_token,
                        username: account.providerAccountId,
                        accessTokenExpires: account.expires_at * 1000,

                    };
                }
            
            // Return previous token if the access token has not expired yet
            if (Date.now() < token.accessTokenExpires) {
                console.log("EXISTING ACCESS TOKEN IS VALID")
                return token;
            }
            // Access token has expired, so we need to refresh it 
            console.log("ACCESS TOKEN HAS EXPIRED, REFRESHING..");
            return await refreshAccessToken(token);
        },
        
        async session({ session, token }: any) {
            session.user.accessToken = token.accessToken;
            session.user.refreshToken = token.refreshToken;
            session.user.username = token.username; 


            return session
        }
        
    },
})