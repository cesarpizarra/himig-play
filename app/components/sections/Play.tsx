"use client";
import React, { useEffect, useState } from "react";
import SpotifyPlayer from "react-spotify-web-playback";
import { useSession } from "next-auth/react";
import { useCurrentPlaying } from "@/app/hooks/useSpotify";
import { CurrentPlayingTrack } from "@/app/types/spotify";
import Link from "next/link";
import { FaGithub } from "react-icons/fa";

export default function Play() {
  const { data: session, status } = useSession();
  const { data, isLoading } = useCurrentPlaying();
  const [token, setToken] = useState<string | null>(null);
  const [currentTrack, setCurrentTrack] = useState<CurrentPlayingTrack | null>(
    null,
  );

  useEffect(() => {
    if (session?.token.access_token) {
      setToken(session.token.access_token as string);
    }
  }, [session]);

  useEffect(() => {
    if (data?.item) {
      const track: CurrentPlayingTrack = {
        current_playing_type: data.current_playing_type,
        is_playing: data.is_playing,
        item: {
          name: data.item.name,
          album: {
            name: data.item.album.name,
            images: data.item.album.images,
            external_urls: data.item.album.external_urls,
          },
          artists: data.item.artists.map((artist: any) => ({
            name: artist.name,
            external_urls: artist.external_urls,
          })),
          external_urls: data.item.external_urls,
        },
      };
      setCurrentTrack(track);
    }
  }, [data]);

  if (status === "loading" || isLoading)
    return <div>Loading Spotify Player...</div>;
  if (!token) return <div>No access token available. Please log in.</div>;

  return (
    <div className="sticky bottom-0 z-50 w-full overflow-x-hidden bg-black pb-4 pt-7">
      <Link
        href="https://github.com/cesarpizarra"
        target="_blank"
        className="mr-5 flex items-center gap-2 hover:underline"
      >
        <FaGithub size={20} className="cursor-pointer text-gray-400" />

        <span className="text-xs font-medium text-gray-400 md:text-sm">
          Made with Cezaru
        </span>
      </Link>
      <SpotifyPlayer
        token={token}
        showSaveIcon
        uris={currentTrack ? [currentTrack.item.external_urls.spotify] : []}
        styles={{
          bgColor: "oklch(21.1484% .01165 254.088 / 1)",
          color: "#fff",
          trackNameColor: "#fff",
          trackArtistColor: "#b3b3b3",
          sliderColor: "#1db954",
          sliderHandleColor: "#1db954",
          sliderTrackColor: "#535353",
        }}
        play={currentTrack ? currentTrack.is_playing : false}
      />
    </div>
  );
}
