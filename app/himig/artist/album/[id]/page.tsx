"use client";
import Error from "@/app/components/common/Error";
import Loading from "@/app/components/common/Loading";
import usePlaySong from "@/app/hooks/usePlaySong";
import { useArtistAlbum } from "@/app/hooks/useSpotify";
import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";

type ArtistAlbum = {
  href: string;
  items: {
    name: string;
    album_type: string;
    images: { url: string }[];
    release_date: string;
    total_tracks: number;
    uri: string;
    id: string;
  }[];
  limit: number;
  next: string | null;
  previous: string | null;
  total: number;
};

const Album = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data, isLoading, error } = useArtistAlbum(params.id);
  const { handlePlay } = usePlaySong();

  if (isLoading) return <Loading />;
  if (error) return <Error message={error as any} />;

  const albumData = data as ArtistAlbum;

  return (
    <div className="min-h-screen rounded-md">
      {/* Album Section */}
      <div className="p-4">
        <h1 className="mb-4 text-xl font-semibold">Artist's Albums</h1>
        <div className="p-4">
          <table className="w-full table-auto border-collapse text-left text-sm">
            <thead>
              <tr className="border-b-2 border-gray-800">
                <th className="px-4 py-2">#</th>
                <th className="px-4 py-2">Title</th>
                <th className="px-4 py-2">Album</th>
                <th className="px-4 py-2">Release Date</th>
              </tr>
            </thead>
            <tbody>
              {albumData.items.map((item, index) => (
                <tr
                  key={index}
                  className="group border-b border-gray-800 transition-all duration-300 hover:bg-gray-500"
                >
                  <td className="relative px-4 py-4">
                    <span className="group-hover:opacity-0">{index + 1}</span>
                    <FaPlay
                      size={18}
                      onClick={() => handlePlay(item.uri)}
                      className="absolute inset-0 left-4 top-6 cursor-pointer text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </td>
                  <td className="flex items-center gap-3 px-4 py-2">
                    <img
                      src={item.images[0]?.url}
                      alt={item.name}
                      className="h-12 w-12 rounded-md object-cover"
                    />
                    <div className="w-40 overflow-hidden text-ellipsis whitespace-nowrap">
                      {item.name}
                    </div>
                  </td>

                  <td className="px-4 py-2">
                    <Link
                      href={`/himig/album/${item.id}`}
                      className="truncate group-hover:underline"
                    >
                      {item.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2">{item.release_date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Album;
