import { NextResponse } from "next/server";
import spotifyApi, { setSpotifyAccessToken } from "@/app/util/spotifyApi";
import { getAuthenticatedSession } from "@/app/util/auth";

export async function GET(request: Request) {
  try {
    const accessToken = await getAuthenticatedSession();
    setSpotifyAccessToken(accessToken);

    const url = new URL(request.url);
    const query = url.searchParams.get("q");

    if (!query) {
      return NextResponse.json(
        { error: "Query parameter is required" },
        { status: 400 },
      );
    }

    // Search for tracks, artists, albums, etc.
    const searchResults = await spotifyApi.search(query, [
      "track",
      "artist",
      "album",
    ]);

    return NextResponse.json(searchResults.body);
  } catch (error: any) {
    console.error("Error fetching Spotify data:", error.message || error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
