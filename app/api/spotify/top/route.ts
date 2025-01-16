import { NextResponse } from "next/server";
import spotifyApi, { setSpotifyAccessToken } from "@/app/util/spotifyApi";
import { getAuthenticatedSession } from "@/app/util/auth";

export async function GET() {
  try {
    const accessToken = await getAuthenticatedSession();

    setSpotifyAccessToken(accessToken);

    const topArtists = await spotifyApi.getMyTopArtists({
      time_range: "short_term",
    });

    const top3Artists = topArtists.body.items.slice(0, 4);

    return NextResponse.json(top3Artists);
  } catch (error: any) {
    console.error("Error fetching Spotify data:", error.message || error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
