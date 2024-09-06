import Image from "next/image";
import React from "react";

export default function Rightbar() {
  return (
    <div>
      <div className="hidden min-h-screen w-80 rounded-md bg-base-300 p-4 lg:block">
        <h1 className="pb-2">Taylor</h1>
        <div className="flex w-full flex-col items-center justify-between">
          <div>
            <Image
              src="/taylor.jpg"
              width={400}
              height={100}
              alt="Taylor Swift"
              className="rounded-md"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
