import { NextResponse } from "next/server";
import spotifyApi, { setSpotifyAccessToken } from "@/app/util/spotifyApi";
import { getAuthenticatedSession } from "@/app/util/auth";

export async function GET() {
  try {
    const accessToken = await getAuthenticatedSession();

    setSpotifyAccessToken(accessToken);

    const topTracks = await spotifyApi.getMyTopTracks({
      time_range: "short_term",
    });

    const top4Tracks = topTracks.body.items.slice(0, 4);

    return NextResponse.json(top4Tracks);
  } catch (error: any) {
    console.error("Error fetching Spotify data:", error.message || error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
