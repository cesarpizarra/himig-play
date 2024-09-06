"use client";
import Loading from "@/app/components/common/Loading";
import { useProfile } from "@/app/hooks/useProfile";
import React from "react";
import { FaRegUser } from "react-icons/fa";

export default function UserProfile() {
  const { data, isLoading, error } = useProfile();

  if (isLoading) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-base-300">
        <Loading />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center">
        <p className="text-red-500">Error fetching profile: {error.message}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full rounded-md bg-base-300">
      <div className="flex h-52 items-center gap-5 rounded-t-md bg-gray-600 px-4">
        <div className="rounded-full bg-base-300 p-4">
          <FaRegUser size={50} />
        </div>
        <div>
          <h3 className="text-sm">Profile</h3>
          <h1 className="text-2xl font-semibold md:text-5xl">
            {data?.display_name}
          </h1>
          <p className="text-xs">{data?.email}</p>
          <p className="text-md pt-3">{data?.followers.total} Followers</p>
        </div>
      </div>
    </div>
  );
}
