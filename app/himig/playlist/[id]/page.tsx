"use client";
import Error from "@/app/components/common/Error";
import Loading from "@/app/components/common/Loading";
import usePlaySong from "@/app/hooks/usePlaySong";
import { usePlaylistById } from "@/app/hooks/useSpotify";
import { getDominantColor } from "@/app/util/colorUtil";
import { formatDuration } from "@/app/util/formatDuration";
import React, { useEffect, useState } from "react";
import { FaClock, FaPlay } from "react-icons/fa";

const Playlist = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data, isLoading, error } = usePlaylistById(params.id);
  const { handlePlay } = usePlaySong();
  const [bgColor, setBgColor] = useState<string>("#4b5563");

  useEffect(() => {
    const fetchColor = async () => {
      if (data && data.images.length > 0) {
        try {
          const color = await getDominantColor(data.images[0].url);
          setBgColor(color);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchColor();
  }, [data]);
  if (isLoading) return <Loading />;
  if (error) return <Error message={error as any} />;

  return (
    <div className="min-h-screen rounded-md">
      {/* Profile data */}
      <div
        className="flex h-52 items-center gap-5 rounded-t-md px-4"
        style={{ background: bgColor }}
      >
        {data && data?.images.length > 0 && (
          <img
            src={data?.images[0]?.url}
            alt={data?.name}
            className="h-44 w-44 rounded-md object-cover"
          />
        )}
        <div>
          <h3 className="text-sm capitalize text-gray-300">{data?.type}</h3>
          <h1 className="text-2xl font-semibold md:text-5xl">{data?.name}</h1>
          {/* <div className="mt-2 flex items-center gap-1">
            <p className="text-xs">{data?.label}</p>
            <GoDotFill />
            <p className="text-xs">{data?.total_tracks} Songs</p>
          </div> */}
        </div>
      </div>

      {/* Table Section */}
      <div className="p-4">
        <table className="w-full table-auto border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">Album</th>
              <th className="px-4 py-2">
                <FaClock />
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.tracks.items.map((item, index) => (
              <tr
                key={index}
                className="group border-b border-gray-800 transition-all duration-300 hover:bg-gray-500"
              >
                <td className="relative px-4 py-4">
                  <span className="group-hover:opacity-0">{index + 1}</span>
                  <FaPlay
                    size={18}
                    onClick={() => handlePlay(item.track.uri)}
                    className="absolute inset-0 left-4 top-6 cursor-pointer text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  />
                </td>
                <td className="flex items-center gap-3 px-4 py-2">
                  <img
                    src={item.track.album.images[0]?.url}
                    alt={item.track.name}
                    className="h-12 w-12 rounded-md object-cover"
                  />
                  <div className="w-40 overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.track.name}
                  </div>
                </td>

                <td className="px-4 py-2">
                  <p className="truncate">{item.track.album.name}</p>
                </td>
                <td className="px-4 py-2">
                  {formatDuration(item.track.duration_ms)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Playlist;
