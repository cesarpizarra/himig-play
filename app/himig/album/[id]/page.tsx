"use client";
import Error from "@/app/components/common/Error";
import Loading from "@/app/components/common/Loading";
import { useAlbum } from "@/app/hooks/useSpotify";
import { getDominantColor } from "@/app/util/colorUtil";
import React, { useEffect, useState } from "react";
import { FaClock } from "react-icons/fa";
import { GoDotFill } from "react-icons/go";

const Album = ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const { data, isLoading, error } = useAlbum(params.id);

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
          <div className="mt-2 flex items-center gap-1">
            <p className="text-xs">{data?.label}</p>
            <GoDotFill />
            <p className="text-xs">{data?.total_tracks} Songs</p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="p-4">
        <table className="w-full table-auto border-collapse text-left text-sm">
          <thead>
            <tr className="border-b-2 border-gray-800">
              <th className="px-4 py-2">#</th>
              <th className="px-4 py-2">Title</th>
              <th className="px-4 py-2">
                <FaClock />
              </th>
            </tr>
          </thead>
          <tbody>
            {data?.tracks.items.map((item, index) => (
              <tr
                key={index}
                className="cursor-pointer border-b border-gray-800 hover:bg-gray-500"
              >
                <td className="px-4 py-2">{index + 1}</td>
                <td className="px-4 py-2">
                  <div className="w-40 overflow-hidden text-ellipsis whitespace-nowrap">
                    {item.name}
                  </div>
                </td>
                <td className="px-4 py-2">
                  {item.duration_ms
                    ? `${Math.floor(item.duration_ms / 60000)}:${Math.floor(
                        (item.duration_ms % 60000) / 1000,
                      )
                        .toString()
                        .padStart(2, "0")}`
                    : "--:--"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Album;
