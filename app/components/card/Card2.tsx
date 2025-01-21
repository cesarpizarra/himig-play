import React from "react";
import { TopArtist } from "@/app/types/spotify";
import SkeletonLoader from "@/app/components/common/SkeletonLoader";
import Error from "../common/Error";
import Link from "next/link";

interface Card2Props {
  data: TopArtist[] | undefined;
  isLoading: boolean;
  error: any;
  title: string;
}

const Card2: React.FC<Card2Props> = ({ data, isLoading, error, title }) => {
  if (error) return <Error message={error as any} />;

  return (
    <div className="p-6">
      <div className="mb-4 flex items-center justify-between">
        <h1 className="text-md font-semibold text-white md:text-lg">{title}</h1>
        <Link href="#">
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
                className="flex-shrink-0 transform cursor-pointer flex-col items-center p-2 transition-transform duration-200 ease-in-out hover:scale-105 hover:bg-base-100"
              >
                <img
                  src={item.images[0].url}
                  alt={item.name}
                  className="h-32 w-32 rounded-md object-cover shadow-lg md:h-40 md:w-40"
                />
                <div className="mt-2 text-center text-sm font-semibold text-white">
                  <h3 className="max-w-[150px] truncate">{item.name}</h3>
                  <p className="text-xs capitalize text-gray-400">
                    {item.type}
                  </p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Card2;
