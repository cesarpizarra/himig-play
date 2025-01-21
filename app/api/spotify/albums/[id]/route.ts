import { getAuthenticatedSession } from "@/app/util/auth";
import spotifyApi, { setSpotifyAccessToken } from "@/app/util/spotifyApi";
import { NextResponse } from "next/server";

export async function GET(
  request: Request,
  { params }: { params: { id: number } },
) {
  try {
    const { id } = params;

    const accessToken = await getAuthenticatedSession();

    setSpotifyAccessToken(accessToken);

    const album = await spotifyApi.getAlbum(String(id));

    return NextResponse.json(album.body);
  } catch (error) {
    console.error("Failed to retrieve spotify data:", error);
    return NextResponse.json(
      {
        status: false,
        message: "Failed to retrieve spotify data",
      },
      { status: 500 },
    );
  }
}
