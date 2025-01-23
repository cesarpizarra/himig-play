"use client";
import React from "react";
import { IoLibrary } from "react-icons/io5";
import { useAlbums, usePlaylist, useTracks } from "@/app/hooks/useSpotify";
import Error from "../common/Error";
import SkeletonLoader from "../common/SkeletonLoader";
import { FaHeart } from "react-icons/fa";
import Link from "next/link";

export default function Sidebar() {
  const { data: playlistData, isLoading, error } = usePlaylist();
  const { data: albumData, isLoading: albumLoading } = useAlbums();
  const { data: trackData, isLoading: trackLoading } = useTracks();

  if (error) return <Error message={error as any} />;

  const playlists = playlistData?.items || [];
  const albums = albumData?.items || [];

  return (
    <div className="h-full rounded-md bg-base-300 p-4">
      <div className="flex items-center justify-between px-6 pb-4 text-gray-400">
        <div className="flex items-center gap-4 text-white">
          <IoLibrary size={25} />
          <h1>Your Library</h1>
        </div>
      </div>
      <div className="mt-4 flex flex-col">
        {/* Liked Songs Menu */}
        {isLoading ? (
          <SkeletonLoader count={1} itemClassName="custom-item-class" />
        ) : (
          <Link href="/himig/liked-songs">
            <div className="flex cursor-pointer items-center rounded-md p-2 transition-all duration-300 hover:bg-gray-200 hover:bg-opacity-15">
              <div className="rounded-md bg-gradient-to-r from-purple-800 to-white p-4">
                <FaHeart size={30} className="text-white" />
              </div>

              <div className="ml-4 mt-2 text-sm font-semibold text-white">
                <h1>Liked Songs</h1>
                <div className="inline-flex items-center gap-2 text-xs capitalize text-gray-400">
                  Playlist {trackData?.total || 0} songs
                </div>
              </div>
            </div>
          </Link>
        )}

        {isLoading ? (
          <SkeletonLoader count={5} itemClassName="custom-item-class" />
        ) : playlists.length > 0 ? (
          playlists.map((playlist) => (
            <Link key={playlist.id} href={`/himig/playlist/${playlist.id}`}>
              <div className="flex cursor-pointer rounded-md p-2 transition-all duration-300 hover:bg-gray-200 hover:bg-opacity-15">
                <img
                  src={playlist.images[0]?.url}
                  alt={playlist.name}
                  className="h-12 w-12 rounded-md object-cover"
                />
                <div className="ml-4 mt-2 text-sm font-semibold text-white">
                  <h1>{playlist.name}</h1>
                  <p className="text-xs capitalize text-gray-400">
                    {playlist.type}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>No playlists found.</div>
        )}

        {albumLoading ? (
          <SkeletonLoader count={2} itemClassName="custom-item-class" />
        ) : albums.length > 0 ? (
          albums.map((album) => (
            <Link href={`/himig/album/${album.album.id}`} key={album.album.id}>
              <div className="flex cursor-pointer rounded-md p-2 transition-all duration-300 hover:bg-gray-200 hover:bg-opacity-15">
                <img
                  src={album.album.images[0]?.url}
                  alt={album.album.name}
                  className="h-12 w-12 rounded-md object-cover"
                />
                <div className="ml-4 mt-2 text-sm font-semibold text-white">
                  <h1>{album.album.name}</h1>
                  <p className="text-xs capitalize text-gray-400">
                    {album.album.type}
                  </p>
                </div>
              </div>
            </Link>
          ))
        ) : (
          <div>No albums found.</div>
        )}
      </div>
    </div>
  );
}
