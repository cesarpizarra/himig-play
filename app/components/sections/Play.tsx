"use client";
import React, { useEffect, useState } from "react";
import { IoLibrary } from "react-icons/io5";
import { FaHome, FaSearch } from "react-icons/fa";
import Link from "next/link";
import SpotifyPlayer from "react-spotify-web-playback";
import { useSession } from "next-auth/react";
import { useCurrentPlaying } from "@/app/hooks/useSpotify";
import { CurrentPlayingTrack } from "@/app/types/spotify";

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

  if (status === "loading") return <div>Loading Spotify Player...</div>;
  if (!token) return <div>No access token available. Please log in.</div>;

  return (
    <div className="sticky bottom-0 z-50 w-full overflow-x-hidden bg-dark px-4 pb-4 pt-7">
      {currentTrack && (
        <div className="mb-4 flex items-center gap-4 text-white">
          <img
            src={currentTrack.item.album.images[0]?.url}
            alt={currentTrack.item.name}
            className="h-12 w-12 rounded-md object-cover"
          />
          <div>
            <h3 className="text-sm font-semibold">{currentTrack.item.name}</h3>
            <p className="text-xs text-gray-400">
              {currentTrack.item.artists
                .map((artist) => artist.name)
                .join(", ")}
            </p>
          </div>
        </div>
      )}
      {/* <SpotifyPlayer
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
      /> */}
      <div className="divider flex md:hidden"></div>
      <div className="mt-4 flex items-center justify-between md:hidden">
        <div data-tip="Home" className="tooltip tooltip-top">
          <Link href="/himig/home" className="btn btn-circle">
            <FaHome size={20} />
          </Link>
        </div>
        <div data-tip="Search" className="tooltip tooltip-top">
          <Link href="/himig/home" className="btn btn-circle">
            <FaSearch size={20} />
          </Link>
        </div>
        <div data-tip="Your Library" className="tooltip tooltip-top">
          <Link href="/himig/home" className="btn btn-circle">
            <IoLibrary size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
