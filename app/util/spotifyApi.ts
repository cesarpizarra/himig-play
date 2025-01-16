import SpotifyWebApi from "spotify-web-api-node";

const spotifyApi = new SpotifyWebApi({
  clientId: process.env.SPOTIFY_CLIENT_ID,
  clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
  redirectUri: process.env.SPOTIFY_REDIRECT_URI,
});

export function setSpotifyAccessToken(accessToken: string) {
  spotifyApi.setAccessToken(accessToken);
}

export async function refreshSpotifyAccessToken(refreshToken: string) {
  try {
    spotifyApi.setRefreshToken(refreshToken);
    const data = await spotifyApi.refreshAccessToken();
    const { access_token, expires_in } = data.body;

    return {
      accessToken: access_token,
      expiresAt: Date.now() + expires_in * 1000,
    };
  } catch (error) {
    console.error("Error refreshing Spotify access token:", error);
    throw new Error("Failed to refresh Spotify access token");
  }
}

export default spotifyApi;
