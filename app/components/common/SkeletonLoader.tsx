import React from "react";

interface SkeletonLoaderProps {
  count: number;
  itemClassName?: string;
}

const SkeletonLoader: React.FC<SkeletonLoaderProps> = ({
  count,
  itemClassName,
}) => {
  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div
          key={index}
          className={`flex animate-pulse items-center gap-4 rounded-md p-2 ${itemClassName}`}
        >
          <div className="h-12 w-12 rounded-md bg-gray-700"></div>
          <div className="h-4 w-32 rounded-md bg-gray-700"></div>
        </div>
      ))}
    </>
  );
};

export default SkeletonLoader;
