import React from "react";
import { TopTrack } from "@/app/types/spotify";
import SkeletonLoader from "@/app/components/common/SkeletonLoader";
import Link from "next/link";

interface Props {
  topTracks: TopTrack[] | null | undefined;
  isLoading: boolean;
  error: any;
}

const TopTracksSection: React.FC<Props> = ({ topTracks, isLoading, error }) => {
  if (error) return <div>Error loading top tracks: {error.message}</div>;

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-md font-semibold text-white md:text-lg">
          Top Track This Month
        </h1>
        <Link href="#">
          <p className="text-sm text-gray-400 hover:underline">Show all</p>
        </Link>
      </div>
      <div className="mt-4 flex flex-col">
        {isLoading ? (
          <SkeletonLoader count={4} itemClassName="custom-item-class" />
        ) : (
          topTracks?.map((track) => (
            <div
              key={track.id}
              className="flex cursor-pointer rounded-md p-2 transition-all duration-300 hover:bg-gray-200 hover:bg-opacity-15"
            >
              <img
                src={track.album.images[0]?.url}
                alt={track.name}
                className="h-12 w-12 rounded-md object-cover"
              />
              <div className="ml-4 mt-2 text-sm font-semibold text-white">
                <h3>{track.name}</h3>
                <p className="text-xs text-gray-400">
                  {track.artists.map((artist) => artist.name).join(", ")}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopTracksSection;
