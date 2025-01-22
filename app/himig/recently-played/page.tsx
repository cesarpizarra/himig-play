"use client";
import Error from "@/app/components/common/Error";
import Loading from "@/app/components/common/Loading";
import usePlaySong from "@/app/hooks/usePlaySong";
import { useRecent } from "@/app/hooks/useSpotify";
import React from "react";
import { FaPlay } from "react-icons/fa";
import { DefaultItem2 } from "@/app/types/spotify";
import Link from "next/link";

type Track = {
  track: {
    album: DefaultItem2;
    uri: string;
  };
};

export default function RecentlyPlayed() {
  const { data, isLoading, error } = useRecent();
  const { handlePlay } = usePlaySong();

  if (isLoading) return <Loading />;
  if (error) return <Error message={error as any} />;

  return (
    <div className="min-h-screen rounded-md p-4">
      <h1 className="text-2xl font-bold md:text-4xl">Recently Played</h1>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {data?.items?.map((item: Track, index: number) => (
          <div
            key={index}
            className="group flex-shrink-0 transform cursor-pointer flex-col items-center p-2 transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-base-100"
          >
            <Link href={`/himig/album/${item.track.album.id}`}>
              <img
                src={item.track.album.images[0]?.url}
                alt={item.track.album.name}
                className="h-32 w-32 rounded-md object-cover shadow-lg md:h-40 md:w-40"
              />

              {/* Track Info */}
              <div className="mt-2 text-center text-sm font-semibold text-white">
                <h3 className="max-w-[150px] truncate">
                  {item.track.album.name}
                </h3>
                <p className="truncate text-xs capitalize text-gray-400">
                  {item.track.album.artists
                    .map((artist) => artist.name)
                    .join(", ")}
                </p>
              </div>
            </Link>

            {/* Play button */}
            <button
              onClick={() => handlePlay(item.track.uri)}
              className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              <FaPlay className="h-6 w-6 text-black" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
