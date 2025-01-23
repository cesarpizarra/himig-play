"use client";
import { useProfile } from "@/app/hooks/useProfile";
import { useTracks } from "@/app/hooks/useSpotify";
import React from "react";
import { FaHeart, FaPlay, FaRegUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { FaClock } from "react-icons/fa";
import usePlaySong from "@/app/hooks/usePlaySong";
import { formatDuration } from "@/app/util/formatDuration";
import Loading from "@/app/components/common/Loading";
import Error from "@/app/components/common/Error";
import Link from "next/link";

const LikedSongs = () => {
  const { data: profile } = useProfile();
  const { data: trackData, isLoading, error } = useTracks();
  const { handlePlay } = usePlaySong();

  if (isLoading) return <Loading />;
  if (error) return <Error message={error as any} />;

  return (
    <div className="min-h-screen rounded-md">
      {/* Header Section */}
      <div className="flex h-52 items-center gap-5 rounded-t-lg bg-gradient-to-r from-purple-800 to-gray-400 px-4">
        <div className="rounded-md bg-gradient-to-r from-purple-800 to-white p-8">
          <FaHeart size={60} className="text-white" />
        </div>

        <div className="flex flex-col">
          <p className="text-sm md:text-xl">Playlists</p>
          <h1 className="text-sm font-bold md:text-3xl lg:text-5xl">
            Liked Songs
          </h1>
          {profile && profile?.images.length > 0 ? (
            <div className="flex items-center gap-2">
              <img
                src={profile?.images[0]?.url}
                alt={profile?.display_name}
                className="h-8 w-8 rounded-full object-cover"
              />
              <GoDotFill />
              <p className="text-xs">{trackData?.total || 0} songs</p>
            </div>
          ) : (
            <FaRegUser />
          )}
        </div>
      </div>

      {/* Table Section */}
      <div className="p-4">
        <table className="w-full table-auto border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Album</th>
              <th className="px-4 py-2 text-center">
                <FaClock />
              </th>
            </tr>
          </thead>
          <tbody>
            {trackData?.items.map((item, index) => (
              <tr
                key={index}
                className="group transition-all duration-300 hover:bg-gray-500"
              >
                <td className="relative px-4 py-4">
                  <span className="group-hover:opacity-0">{index + 1}</span>
                  <FaPlay
                    size={18}
                    onClick={() => handlePlay(item.track.uri)}
                    className="absolute inset-0 left-4 top-6 cursor-pointer text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </td>
                <td className="inline-flex items-center gap-2 px-4 py-2">
                  <img
                    src={item.track.album.images[0]?.url}
                    alt={item.track.name}
                    className="h-12 w-12 rounded-l-md object-cover"
                  />
                  <p className="max-w-[250px] truncate">{item.track.name}</p>{" "}
                </td>
                <td className="px-4 py-2">
                  <Link
                    href={`/himig/album/${item.track.album.id}`}
                    className="max-w-[250px] truncate group-hover:underline"
                  >
                    {item.track.album.name}
                  </Link>
                </td>
                <td className="px-4 py-2 text-center">
                  {formatDuration(item.track.duration_ms)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default LikedSongs;
