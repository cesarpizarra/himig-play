"use client";
import { useCurrentPlaying } from "@/app/hooks/useSpotify";
import React, { useEffect, useState } from "react";
import SkeletonLoader from "../common/SkeletonLoader";
import Image from "next/image";

interface Track {
  item: {
    name: string;
    album: {
      name: string;
      images: Array<{ url: string }>;
      external_urls: Record<string, string>;
      release_date: string;
    };
    artists: Array<{ name: string; external_urls: Record<string, string> }>;
    external_urls: Record<string, string>;
  };
}

export default function Rightbar() {
  const { data, isLoading } = useCurrentPlaying();
  const [currentTrack, setCurrentTrack] = useState<Track | null>(null);

  useEffect(() => {
    if (data?.item) {
      const track: Track = {
        item: {
          name: data.item.name,
          album: {
            name: data.item.album.name,
            images: data.item.album.images,
            external_urls: data.item.album.external_urls,
            release_date: data.item.album.release_date,
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

  return (
    <div className="h-full rounded-md bg-base-300 p-4">
      {isLoading ? (
        <SkeletonLoader count={5} />
      ) : (
        currentTrack && (
          <div className="text-white">
            <h1 className="mb-4 text-center text-2xl font-semibold">
              {currentTrack.item.name}
            </h1>
            <div className="mb-6 flex flex-col items-center text-center">
              <Image
                src={currentTrack.item.album.images[0]?.url}
                alt={currentTrack.item.name}
                className="rounded-md object-cover"
                width={200}
                height={200}
              />
              <div className="mt-4 space-y-2">
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-gray-300">Album:</span>{" "}
                  <a
                    href={currentTrack.item.album.external_urls.spotify}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline"
                  >
                    {currentTrack.item.album.name}
                  </a>
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-gray-300">
                    Release Date:
                  </span>{" "}
                  {currentTrack.item.album.release_date}
                </p>
                <p className="text-sm text-gray-400">
                  <span className="font-semibold text-gray-300">Artists:</span>{" "}
                  {currentTrack.item.artists.map((artist, index) => (
                    <span key={index}>
                      <a
                        href={artist.external_urls.spotify}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        {artist.name}
                      </a>
                      {index < currentTrack.item.artists.length - 1 && ", "}
                    </span>
                  ))}
                </p>
              </div>
            </div>
            <div className="mt-4 text-center">
              <a
                href={currentTrack.item.external_urls.spotify}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm font-medium text-primary hover:underline"
              >
                Open in Spotify
              </a>
            </div>
          </div>
        )
      )}
    </div>
  );
}
