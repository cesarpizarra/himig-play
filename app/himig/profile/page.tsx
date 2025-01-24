"use client";
import Error from "@/app/components/common/Error";
import Loading from "@/app/components/common/Loading";
import { useProfile } from "@/app/hooks/useProfile";
import React, { useEffect, useState } from "react";
import { FaRegUser } from "react-icons/fa";
import {
  useFollowed,
  useTop3Artists,
  useTopTracks,
} from "@/app/hooks/useSpotify";
import TopTracksSection from "@/app/components/sections/TopTracks";
import TopArtistsSection from "@/app/components/sections/TopArtists";
import FollowedArtistsSection from "@/app/components/sections/Followed";
import { getDominantColor } from "@/app/util/colorUtil";
import Image from "next/image";

export default function UserProfile() {
  const { data: profile, isLoading, error } = useProfile();
  const { data: topArtists, isLoading: topLoading } = useTop3Artists();
  const { data: topTracks, isLoading: trackLoading } = useTopTracks();
  const { data: followed, isLoading: followedLoading } = useFollowed();
  const [bgColor, setBgColor] = useState<string>("#4b5563");

  useEffect(() => {
    const fetchColor = async () => {
      if (profile && profile.images.length > 0) {
        try {
          const color = await getDominantColor(profile.images[0].url);
          setBgColor(color);
        } catch (err) {
          console.error(err);
        }
      }
    };

    fetchColor();
  }, [profile]);

  if (isLoading) return <Loading />;
  if (error) return <Error message={error as any} />;

  const gradientStyle = `linear-gradient(to bottom, ${bgColor}, transparent)`;

  return (
    <div className="min-h-screen rounded-md">
      {/* Profile data */}
      <div
        className="flex h-52 items-center gap-5 rounded-t-md px-4"
        style={{ background: gradientStyle }}
      >
        {profile && profile?.images.length > 0 ? (
          <Image
            src={profile?.images[0]?.url}
            alt={profile?.display_name}
            className="h-32 w-32 rounded-full object-cover"
            width={128}
            height={128}
          />
        ) : (
          <div className="rounded-full bg-base-300 p-4">
            <FaRegUser size={50} />
          </div>
        )}
        <div>
          <h3 className="text-sm">Profile</h3>
          <h1 className="text-2xl font-semibold md:text-5xl">
            {profile?.display_name}
          </h1>
          <p className="text-xs">{profile?.email}</p>
          <p className="text-md pt-3">{profile?.followers.total} Followers</p>
        </div>
      </div>

      {/* Top artists data */}
      <TopArtistsSection
        topArtists={topArtists}
        isLoading={topLoading}
        error={error}
      />

      {/* Top artists data */}
      <TopTracksSection
        topTracks={topTracks}
        isLoading={trackLoading}
        error={error}
      />

      {/* Following data */}
      <FollowedArtistsSection
        following={followed}
        isLoading={followedLoading}
        error={error}
      />
    </div>
  );
}
