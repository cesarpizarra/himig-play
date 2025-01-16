"use client";
import React from "react";
import { IoLibrary } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
import { usePlaylist } from "@/app/hooks/useSpotify";
import Error from "../common/Error";
import SkeletonLoader from "../common/SkeletonLoader";
import { PlaylistItem } from "@/app/types/spotify";

export default function Sidebar() {
  const { data, isLoading, error } = usePlaylist();

  if (error) return <Error message={error as any} />;
  const playlists = data?.items || [];

  return (
    <div className="min-h-screen rounded-md bg-base-300 p-4">
      <div className="flex items-center justify-between px-6 pb-4 text-gray-400">
        <div className="flex items-center gap-4 text-white">
          <IoLibrary size={25} />
          <h1>Your Library</h1>
        </div>
        <span
          data-tip="Show more"
          className="tooltip tooltip-right cursor-pointer text-gray-400 hover:text-white"
        >
          <FaArrowRight size={20} />
        </span>
      </div>
      <div className="mt-4 flex flex-col">
        {isLoading ? (
          <SkeletonLoader count={5} itemClassName="custom-item-class" />
        ) : playlists.length > 0 ? (
          playlists.map((playlist: PlaylistItem) => (
            <div
              key={playlist.id}
              className="flex cursor-pointer rounded-md p-2 transition-all duration-300 hover:bg-gray-200 hover:bg-opacity-15"
            >
              <img
                src={playlist.images[0]?.url || "/default-image.jpg"}
                alt={playlist.name}
                className="h-12 w-12 rounded-md object-cover"
              />
              <div className="ml-4 mt-2 text-sm font-semibold text-white">
                {playlist.name}
              </div>
            </div>
          ))
        ) : (
          <div>No playlists found.</div>
        )}
      </div>
    </div>
  );
}
