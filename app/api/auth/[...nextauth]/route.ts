import NextAuth from "next-auth/next";
import { type NextAuthOptions } from "next-auth";
import SpotifyProvider from "next-auth/providers/spotify";
import axios from "axios";
import { JWT } from "next-auth/jwt";

// Define a type for your token with additional properties
interface CustomToken extends JWT {
  access_token?: string;
  refreshToken?: string;
  accessTokenExpires?: number;
  scope?: string;
}

export const authOptions: NextAuthOptions = {
  providers: [
    SpotifyProvider({
      authorization:
        "https://accounts.spotify.com/authorize?scope=user-read-email,playlist-read-private,playlist-modify-private,playlist-modify-public,user-library-read",
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
      return refreshAccessToken(customToken);
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

// Refresh the token if it expires
async function refreshAccessToken(token: CustomToken) {
  try {
    const response = await axios.post(
      "https://accounts.spotify.com/api/token",
      new URLSearchParams({
        grant_type: "refresh_token",
        refresh_token: token.refreshToken!,
        client_id: process.env.SPOTIFY_CLIENT_ID || "",
        client_secret: process.env.SPOTIFY_CLIENT_SECRET || "",
      }),
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
        },
      },
    );

    const refreshedTokens = response.data;

    return {
      ...token,
      access_token: refreshedTokens.access_token,
      accessTokenExpires: Date.now() + refreshedTokens.expires_in * 1000,
      refreshToken: refreshedTokens.refresh_token || token.refreshToken,
    };
  } catch (error) {
    console.error("Error refreshing Spotify access token", error);
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
