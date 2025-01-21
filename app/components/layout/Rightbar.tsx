"use client";
import { useCurrentPlaying } from "@/app/hooks/useSpotify";
import React, { useEffect, useState } from "react";
import SkeletonLoader from "../common/SkeletonLoader";

interface Track {
  item: {
    name: string;
    album: {
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
    <div className="min-h-screen rounded-md bg-base-300 p-4">
      <>
        {isLoading ? (
          <SkeletonLoader count={5} />
        ) : (
          <>
            <h1 className="pb-2">{currentTrack?.item.name}</h1>
            <div className="flex w-full flex-col items-center justify-between">
              <div>
                <img
                  src={currentTrack?.item.album.images[0]?.url}
                  alt={currentTrack?.item.name}
                  className="rounded-md object-cover"
                />
              </div>
            </div>
          </>
        )}
      </>
    </div>
  );
}
