"use client";
import { useProfile } from "@/app/hooks/useProfile";
import { useTracks } from "@/app/hooks/useSpotify";
import React from "react";
import { FaHeart, FaRegUser } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";
import { FaClock } from "react-icons/fa";

const LikedSongs = () => {
  const { data: profile } = useProfile();
  const { data: trackData } = useTracks();

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
              <tr key={index} className="cursor-pointer hover:bg-gray-500">
                <td className="px-4 py-2">{index + 1}</td>
                <td className="inline-flex items-center gap-2 px-4 py-2">
                  <img
                    src={item.track.album.images[0]?.url}
                    alt={item.track.name}
                    className="h-12 w-12 rounded-l-md object-cover"
                  />
                  <p className="truncate">{item.track.name}</p>{" "}
                </td>
                <td className="px-4 py-2">
                  <p className="truncate">{item.track.album.name}</p>
                </td>
                <td className="px-4 py-2 text-center">
                  {/* Add duration if available, or placeholder */}
                  {item.track.duration_ms
                    ? `${Math.floor(item.track.duration_ms / 60000)}:${Math.floor(
                        (item.track.duration_ms % 60000) / 1000,
                      )
                        .toString()
                        .padStart(2, "0")}`
                    : "--:--"}
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
