import React from "react";
import { TopTrack } from "@/app/types/spotify";
import SkeletonLoader from "@/app/components/common/SkeletonLoader";
import { formatDuration } from "@/app/util/formatDuration";
import { FaPlay } from "react-icons/fa";
import usePlaySong from "@/app/hooks/usePlaySong";
import Link from "next/link";
import Image from "next/image";

interface Props {
  topTracks: TopTrack[] | null | undefined;
  isLoading: boolean;
  error: any;
}

const TopTracksSection: React.FC<Props> = ({ topTracks, isLoading, error }) => {
  const { handlePlay } = usePlaySong();
  if (error) return <div>Error loading top tracks: {error.message}</div>;

  return (
    <div className="p-6">
      <h1 className="text-md mb-4 font-semibold text-white md:text-lg">
        Top Track This Month
      </h1>
      <div className="mt-4 overflow-x-auto">
        {isLoading ? (
          <SkeletonLoader count={4} itemClassName="custom-item-class" />
        ) : (
          <table className="min-w-full table-auto border-collapse">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  #
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Track
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Artist(s)
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Album
                </th>
                <th className="px-4 py-2 text-left text-sm font-semibold text-white">
                  Duration
                </th>
              </tr>
            </thead>
            <tbody>
              {topTracks?.map((track, index) => (
                <tr
                  key={track.id}
                  className="group transition-all duration-300 hover:bg-gray-200 hover:bg-opacity-15"
                >
                  <td className="relative px-4 py-4">
                    <span className="group-hover:opacity-0">{index + 1}</span>
                    <FaPlay
                      size={18}
                      onClick={() => handlePlay(track.uri)}
                      className="absolute inset-0 left-4 top-6 cursor-pointer text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                    />
                  </td>

                  <td className="flex items-center px-4 py-2">
                    <Image
                      src={track.album.images[0]?.url}
                      alt={track.name}
                      className="h-12 w-12 rounded-md object-cover"
                      width={48}
                      height={48}
                    />
                    <div className="ml-4 text-sm font-semibold text-white">
                      <h3>{track.name}</h3>
                    </div>
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-400">
                    {track.artists.map((artist) => artist.name).join(", ")}
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-400">
                    <Link
                      href={`/himig/album/${track.album.id}`}
                      className="max-w-[250px] truncate group-hover:underline"
                    >
                      {track.album.name}
                    </Link>
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-400">
                    {formatDuration(track.duration_ms)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default TopTracksSection;
