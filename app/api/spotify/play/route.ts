import { NextResponse } from "next/server";
import { getAuthenticatedSession } from "@/app/util/auth";
import spotifyApi, { setSpotifyAccessToken } from "@/app/util/spotifyApi";

export async function POST(request: Request) {
  try {
    const accessToken = await getAuthenticatedSession();
    const { songUri } = await request.json();

    if (!accessToken || !songUri) {
      return NextResponse.json(
        { error: "Access token or song URI missing" },
        { status: 400 },
      );
    }

    setSpotifyAccessToken(accessToken);

    // Handle album URI
    if (songUri.startsWith("spotify:album:")) {
      const albumId = songUri.split(":")[2];
      const album = await spotifyApi.getAlbumTracks(albumId);
      const trackUris = album.body.items.map((track: any) => track.uri);

      await spotifyApi.play({
        uris: trackUris,
      });

      return NextResponse.json({ message: "Album is now playing!" });
    }

    // Handle artist URI
    if (songUri.startsWith("spotify:artist:")) {
      const artistId = songUri.split(":")[2];

      // Fetch the artist's top tracks
      const topTracks = await spotifyApi.getArtistTopTracks(artistId, "US");
      const trackUris = topTracks.body.tracks.map((track: any) => track.uri);

      await spotifyApi.play({
        uris: trackUris,
      });

      return NextResponse.json({
        message: "Artist's top tracks are now playing!",
      });
    }

    // Handle playlist URI
    if (songUri.startsWith("spotify:playlist:")) {
      const playlistId = songUri.split(":")[2];
      const playlist = await spotifyApi.getPlaylistTracks(playlistId);
      const trackUris = playlist.body.items.map(
        (track: any) => track.track.uri,
      );

      await spotifyApi.play({
        uris: trackUris,
      });

      return NextResponse.json({ message: "Playlist is now playing!" });
    }

    // Handle single track URI
    await spotifyApi.play({
      uris: [songUri],
    });

    return NextResponse.json({ message: "Song is playing!" });
  } catch (error: any) {
    console.error(
      "Error playing song, album, artist, or playlist:",
      error.message || error,
    );
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}
