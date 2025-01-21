import { NextResponse } from "next/server";
import spotifyApi, { setSpotifyAccessToken } from "@/app/util/spotifyApi";
import { getAuthenticatedSession } from "@/app/util/auth";

export async function GET() {
  try {
    const accessToken = await getAuthenticatedSession();

    setSpotifyAccessToken(accessToken);

    const tracks = await spotifyApi.getMySavedTracks();

    return NextResponse.json(tracks.body);
  } catch (error: any) {
    console.error("Error fetching Spotify data:", error.message || error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
