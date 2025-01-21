"use client";
import Card from "@/app/components/card/Card";
import Card2 from "@/app/components/card/Card2";
import SkeletonLoader from "@/app/components/common/SkeletonLoader";
import {
  useAlbums,
  useNewReleases,
  usePlaylist,
  useRecent,
  useTopArtists,
  useTracks,
} from "@/app/hooks/useSpotify";
import Link from "next/link";
import React, { useState } from "react";
import { FaHeart } from "react-icons/fa";

const dummyData = [
  { id: 1, name: "Liked Songs" },
  { id: 2, name: "Taylor Swift" },
  { id: 3, name: "BINI" },
  { id: 4, name: "Liked Songs" },
  { id: 5, name: "Taylor Swift" },
  { id: 6, name: "BINI" },
  { id: 7, name: "BINI" },
  { id: 8, name: "BINI" },
];

const colors: string[] = [
  "#102693",
  "#3B7D0D",
  "#114C90",
  "#935511",
  "#930F27",
  "#701a75",
  "#0c4a6e",
  "#365314",
];

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const {
    data: topArtists,
    isLoading: topLoading,
    error: topError,
  } = useTopArtists();
  const {
    data: newReleases,
    isLoading: newReleasesLoading,
    error: newReleasesError,
  } = useNewReleases();
  const { data: albumData, isLoading: albumLoading } = useAlbums();
  const { data: playlistData, isLoading: playlistLoading } = usePlaylist();

  const {
    data: recents,
    isLoading: recentLoading,
    error: recentError,
  } = useRecent();
  const playlists = playlistData?.items || [];
  const albums = albumData?.items || [];

  return (
    <div className="min-h-screen w-full rounded-md bg-base-200">
      <div
        style={{
          background: hoveredIndex !== null ? colors[hoveredIndex] : "#102693",
        }}
        className="relative z-0 rounded-md p-4 pb-24 transition-all duration-500 ease-in-out"
      >
        <div className="pointer-events-none absolute inset-0 z-[-1] bg-gradient-to-b from-transparent to-base-200"></div>
        <h1>Good Evening!</h1>

        <div className="mt-4 grid grid-cols-2 gap-3 lg:grid-cols-4">
          {playlistLoading || albumLoading ? (
            <SkeletonLoader count={1} />
          ) : (
            <Link href="/himig/liked-songs">
              <div
                className="flex cursor-pointer items-center gap-3 rounded-md bg-gray-100 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter transition-all duration-300 hover:bg-opacity-15"
                onMouseOver={() => setHoveredIndex(colors.length - 1)}
              >
                <div className="rounded-md bg-gradient-to-r from-purple-800 to-white p-4">
                  <FaHeart size={16} className="text-white" />
                </div>
                <div>
                  <p className="text-xs">Liked Songs</p>
                </div>
              </div>
            </Link>
          )}
          {playlistLoading || albumLoading ? (
            <SkeletonLoader count={7} />
          ) : playlists.length > 0 ? (
            playlists.map((playlist, index) => (
              <Link key={playlist.id} href={`/himig/playlist/${playlist.id}`}>
                <div
                  className="flex cursor-pointer items-center gap-3 rounded-md bg-gray-100 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter transition-all duration-300 hover:bg-opacity-15"
                  onMouseOver={() => setHoveredIndex(index)}
                >
                  <img
                    src={playlist.images[0]?.url}
                    alt={playlist.name}
                    className="h-12 w-12 rounded-l-md object-cover"
                  />
                  <div>
                    <p className="text-xs"> {playlist.name}</p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <div>No playlists found.</div>
          )}

          {albums.length > 0 &&
            albums.map((album, index) => (
              <Link key={index} href={`/himig/album/${album.album.id}`}>
                <div
                  className="flex cursor-pointer items-center gap-3 rounded-md bg-gray-100 bg-opacity-10 bg-clip-padding backdrop-blur-sm backdrop-filter transition-all duration-300 hover:bg-opacity-15"
                  onMouseOver={() => setHoveredIndex(index)}
                >
                  <img
                    src={album.album.images[0].url}
                    alt={album.album.name}
                    className="h-12 w-12 rounded-l-md object-cover"
                  />
                  <div>
                    <p className="text-xs"> {album.album.name}</p>
                  </div>
                </div>
              </Link>
            ))}
        </div>
      </div>

      <Card2
        data={newReleases}
        title="New Releases"
        isLoading={newReleasesLoading}
        error={newReleasesError}
      />

      <Card
        data={recents?.items}
        title="Recently Played"
        isLoading={recentLoading}
        error={recentError}
      />

      <Card2
        data={topArtists}
        title="Top Artists"
        isLoading={topLoading}
        error={topError}
      />
    </div>
  );
}
