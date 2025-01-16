import React from "react";
import { TopArtist } from "@/app/types/spotify";
import SkeletonLoader from "@/app/components/common/SkeletonLoader";
import Link from "next/link";

interface Props {
  topArtists: TopArtist[] | null | undefined;
  isLoading: boolean;
  error: any;
}

const TopArtistsSection: React.FC<Props> = ({
  topArtists,
  isLoading,
  error,
}) => {
  if (error) return <div>Error loading top artists: {error.message}</div>;

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-md font-semibold text-white md:text-lg">
          Top Artists This Month
        </h1>
        <Link href="#">
          <p className="text-sm text-gray-400 hover:underline">Show all</p>
        </Link>
      </div>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <SkeletonLoader count={4} itemClassName="custom-item-class" />
        ) : (
          topArtists?.map((artist) => (
            <div key={artist.id} className="flex flex-col items-center">
              <img
                src={artist.images[0]?.url}
                alt={artist.name}
                className="h-32 w-32 transform rounded-full object-cover shadow-lg transition-transform duration-200 ease-in-out hover:scale-105 md:h-40 md:w-40"
              />
              <div className="mt-2 text-center text-sm font-semibold text-white">
                <h3>{artist.name}</h3>
                <p className="text-xs capitalize text-gray-400">
                  {artist.type}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default TopArtistsSection;
