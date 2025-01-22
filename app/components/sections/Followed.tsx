import React from "react";
import { TopArtist } from "@/app/types/spotify";
import SkeletonLoader from "@/app/components/common/SkeletonLoader";
import usePlaySong from "@/app/hooks/usePlaySong";
import { FaPlay } from "react-icons/fa";
import Link from "next/link";

interface Props {
  following: TopArtist[] | null | undefined;
  isLoading: boolean;
  error: any;
}

const FollowedArtistsSection: React.FC<Props> = ({
  following,
  isLoading,
  error,
}) => {
  const { handlePlay } = usePlaySong();

  if (error) return <div>Error loading followed artists: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-md mb-6 font-semibold text-white md:text-lg">
        Following
      </h1>
      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {isLoading ? (
          <SkeletonLoader count={4} itemClassName="custom-item-class" />
        ) : (
          following?.map((artist) => (
            <div
              key={artist.id}
              className="group flex transform cursor-pointer flex-col items-center p-2 transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-base-100"
            >
              <Link href={`/himig/artist/#`}>
                <img
                  src={artist.images[0]?.url}
                  alt={artist.name}
                  className="h-32 w-32 rounded-full object-cover shadow-lg md:h-40 md:w-40"
                />
                <div className="mt-2 text-center text-sm font-semibold text-white">
                  <h3>{artist.name}</h3>
                  <p className="text-xs capitalize text-gray-400">
                    {artist.type}
                  </p>
                </div>
              </Link>

              {/* Play button */}
              <button
                onClick={() => handlePlay(artist.uri)}
                className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
              >
                <FaPlay className="h-6 w-6 text-black" />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FollowedArtistsSection;
