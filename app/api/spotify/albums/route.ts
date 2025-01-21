import { NextResponse } from "next/server";
import { getAuthenticatedSession } from "@/app/util/auth";
import spotifyApi, { setSpotifyAccessToken } from "@/app/util/spotifyApi";

export async function GET() {
  try {
    const accessToken = await getAuthenticatedSession();

    setSpotifyAccessToken(accessToken);

    const albums = await spotifyApi.getMySavedAlbums();

    return NextResponse.json(albums.body);
  } catch (error: any) {
    console.error("Error fetching Spotify user data:", error.message);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
