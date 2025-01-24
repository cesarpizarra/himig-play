import usePlaySong from "@/app/hooks/usePlaySong";
import { SearchResult } from "@/app/types/spotify";
import { formatDuration } from "@/app/util/formatDuration";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaPlay } from "react-icons/fa";

export default function SearchData({
  searchResults,
}: {
  searchResults: SearchResult;
}) {
  const { handlePlay } = usePlaySong();
  return (
    <div className="p-4">
      <h2 className="mb-2 text-xl font-semibold">Top Results</h2>
      {/* Display Tracks */}
      {searchResults.tracks?.items.length > 0 && (
        <div>
          {(() => {
            const firstTrack = searchResults.tracks.items[0];
            if (firstTrack) {
              return (
                <div
                  key={firstTrack.id}
                  className="group relative cursor-pointer rounded-lg bg-base-100 p-4 hover:bg-base-200"
                >
                  <Link href={`/himig/album/${firstTrack.album.id}`}>
                    <Image
                      src={firstTrack.album.images[0]?.url}
                      alt={firstTrack.name}
                      className="h-32 w-32 rounded-md object-cover"
                      width={160}
                      height={160}
                    />
                    <h4 className="text-md font-semibold md:text-2xl">
                      {firstTrack.name}
                    </h4>
                    <p className="text-xs text-gray-400">
                      {firstTrack.artists
                        .map((artist) => artist.name)
                        .join(", ")}
                    </p>
                  </Link>

                  {/* Play button */}
                  <button
                    onClick={() => handlePlay(firstTrack.uri)}
                    className="absolute bottom-5 right-5 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 p-3 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  >
                    <FaPlay className="h-6 w-6 text-black" />
                  </button>
                </div>
              );
            }
            return null;
          })()}
        </div>
      )}

      {/* Display Tracks */}
      {searchResults.tracks?.items.length > 0 && (
        <div>
          <h3 className="mt-5 text-lg font-medium text-white">Songs</h3>
          <div className="custom-scrollbar mt-4 overflow-x-auto whitespace-nowrap">
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
                {searchResults.tracks.items.slice(0, 4)?.map((track, index) => (
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
          </div>
        </div>
      )}

      {/* Display Artists */}
      {searchResults.artists?.items.length > 0 && (
        <div className="mt-6">
          <h3 className="text-lg font-medium">Artists</h3>
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {searchResults.artists.items?.slice(0, 4).map((artist) => (
              <div
                key={artist.id}
                className="group flex transform cursor-pointer flex-col items-center p-2 transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-base-100"
              >
                <Link href={`/himig/artist/album/${artist.id}`}>
                  <Image
                    src={artist.images[0]?.url}
                    alt={artist.name}
                    className="h-32 w-32 rounded-full object-cover shadow-lg md:h-40 md:w-40"
                    width={160}
                    height={160}
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
            ))}
          </div>
        </div>
      )}

      {/* Display Albums */}
      {searchResults.albums?.items.length > 0 && (
        <div className="mt-6">
          <h3 className="mb-4 text-lg font-medium text-gray-200">Albums</h3>
          <div className="relative">
            <div className="grid grid-cols-2 gap-6 md:grid-cols-3 lg:grid-cols-4">
              {searchResults.albums.items?.slice(0, 4).map((item, index) => (
                <div
                  key={index}
                  className="group relative flex flex-col items-center rounded-lg p-4 shadow-md transition-all duration-300 ease-in-out hover:scale-105 hover:bg-base-100 hover:shadow-lg"
                >
                  <Link
                    href={`/himig/${item.type === "album" ? `album/${item.id}` : `artist/album/${item.id}`}`}
                  >
                    <div className="relative flex items-center justify-center">
                      <Image
                        src={item.images[0].url}
                        alt={item.name}
                        className="h-40 w-40 rounded-lg object-cover shadow-md md:h-48 md:w-48"
                        width={160}
                        height={160}
                      />
                      {/* Play button overlay */}
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          handlePlay(item.uri);
                        }}
                        className="absolute bottom-4 right-4 flex h-10 w-10 items-center justify-center rounded-full bg-green-500 p-2 text-black opacity-0 shadow-lg transition-opacity duration-300 group-hover:opacity-100"
                      >
                        <FaPlay className="h-6 w-6" />
                      </button>
                    </div>
                  </Link>

                  <div className="mt-4 text-center">
                    <h3 className="truncate text-sm font-semibold text-gray-100">
                      {item.name}
                    </h3>
                    <p className="mt-1 text-xs text-gray-400">
                      {item.artists?.map((artist) => artist.name).join(", ")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
