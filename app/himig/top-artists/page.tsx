"use client";
import Error from "@/app/components/common/Error";
import Loading from "@/app/components/common/Loading";
import usePlaySong from "@/app/hooks/usePlaySong";
import { useTopArtists } from "@/app/hooks/useSpotify";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";

export default function TopArtists() {
  const { data, isLoading, error } = useTopArtists();
  const { handlePlay } = usePlaySong();

  if (isLoading) return <Loading />;
  if (error) return <Error message={error as any} />;

  return (
    <div className="min-h-screen rounded-md p-4">
      <h1 className="text-2xl font-bold md:text-4xl">Top Artists</h1>

      <div className="mt-4 grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
        {data?.map((item, index) => (
          <div
            key={index}
            className="group flex-shrink-0 transform cursor-pointer flex-col items-center p-2 transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-base-100"
          >
            <Link href={`/himig/artist/album/${item.id}`}>
              <div className="relative flex flex-col items-center justify-center">
                <Image
                  src={item.images[0].url}
                  alt={item.name}
                  className="h-32 w-32 rounded-md object-cover shadow-lg md:h-40 md:w-40"
                  width={160}
                  height={160}
                />
                <div className="mt-2 flex flex-col items-center text-center text-sm font-semibold text-white">
                  <h3 className="max-w-[150px] truncate">{item.name}</h3>
                  <p className="text-xs capitalize text-gray-400">
                    {item.type}
                  </p>
                </div>
              </div>
            </Link>
            {/* Play button */}
            <button
              onClick={() => handlePlay(item.uri)}
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
