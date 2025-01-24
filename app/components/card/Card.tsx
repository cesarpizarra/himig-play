import React from "react";
import SkeletonLoader from "@/app/components/common/SkeletonLoader";
import Error from "../common/Error";
import Link from "next/link";
import usePlaySong from "@/app/hooks/usePlaySong";
import { FaPlay } from "react-icons/fa";
import { Album } from "@/app/types/spotify";

interface CardProps {
  data: Array<{ track: { album: Album; uri: string } }> | null | undefined;
  isLoading: boolean;
  error: any;
  title: string;
  pathLink?: string;
}

const Card: React.FC<CardProps> = ({
  data,
  isLoading,
  error,
  title,
  pathLink,
}) => {
  const { handlePlay } = usePlaySong();

  if (error) return <Error message={error as any} />;

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-md font-semibold text-white md:text-lg">{title}</h1>
        <Link href={`/himig/${pathLink}`}>
          <p className="text-sm text-gray-400 hover:underline">Show all</p>
        </Link>
      </div>
      <div className="relative">
        <div className="custom-scrollbar flex space-x-4 overflow-x-auto py-4">
          {isLoading ? (
            <SkeletonLoader count={4} itemClassName="custom-item-class" />
          ) : (
            data?.map((item, index) => (
              <div
                key={index}
                className="group flex-shrink-0 transform cursor-pointer flex-col items-center bg-base-100 p-2 transition-transform duration-200 ease-in-out hover:scale-105"
              >
                <Link href={`/himig/album/${item.track.album.id}`}>
                  <img
                    src={item.track.album.images[0]?.url}
                    alt={item.track.album.name}
                    className="h-32 w-32 rounded-md object-cover shadow-lg md:h-40 md:w-40"
                  />

                  {/* Track Info */}
                  <div className="mt-2 text-center text-sm font-semibold text-white">
                    <h3 className="max-w-[150px] truncate">
                      {item.track.album.name}
                    </h3>
                    <p className="truncate text-xs capitalize text-gray-400">
                      {item.track.album.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </p>
                  </div>
                </Link>
                {/* Play button */}
                <button
                  onClick={() => handlePlay(item.track.uri)}
                  className="absolute bottom-2 right-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                >
                  <FaPlay className="h-6 w-6 text-black" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Card;
