import NextAuth from "next-auth/next";
import { type NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import { JWT } from "next-auth/jwt";
import { refreshSpotifyAccessToken } from "@/app/util/spotifyApi";

interface CustomToken extends JWT {
  access_token?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  scope?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      authorization: `https://accounts.spotify.com/authorize?scope=streaming,user-read-email,user-follow-read,user-top-read,
      playlist-read-private,playlist-modify-private,playlist-modify-public,
      user-library-read,user-read-private,user-read-currently-playing,
      user-modify-playback-state,user-read-playback-state,
      user-read-recently-played`,
      clientId: process.env.SPOTIFY_CLIENT_ID || "",
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET || "",
      token: "https://accounts.spotify.com/api/token",
      userinfo: "https://api.spotify.com/v1/me",
    }),
  ],

  callbacks: {
    async jwt({ token, account }) {
      const customToken = token as CustomToken;

      if (account) {
        customToken.access_token = account.access_token;
        customToken.refreshToken = account.refresh_token;
        customToken.accessTokenExpires = account.expires_at
          ? account.expires_at * 1000 // Convert seconds to ms if defined
          : Date.now() + 3600 * 1000; // Default to 1 hour expiration if undefined
        customToken.scope = account.scope;
      }

      // Check if the access token has expired
      if (Date.now() < (customToken.accessTokenExpires || 0)) {
        return customToken;
      }

      // If the access token has expired, refresh it
      return refreshSpotifyAccessToken(customToken.refreshToken as string);
    },
    async session({ session, token }) {
      const customToken = token as CustomToken;
      return {
        ...session,
        token: customToken,
      };
    },
    async redirect({ url, baseUrl }) {
      return "/himig/home";
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
