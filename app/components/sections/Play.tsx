"use client";
import React, { useEffect, useState } from "react";
import { IoLibrary } from "react-icons/io5";
import { FaHome, FaSearch } from "react-icons/fa";
import Link from "next/link";
import SpotifyPlayer from "react-spotify-web-playback";
import { useSession } from "next-auth/react";

export default function Play() {
  const { data: session, status } = useSession();
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    if (session?.token.access_token) {
      setToken(session.token.access_token as string);
    }
  }, [session]);

  if (status === "loading") return <div>Loading Spotify Player...</div>;
  if (!token) return <div>No access token available. Please log in.</div>;

  return (
    <div className="sticky bottom-0 z-50 w-full overflow-x-hidden bg-dark px-4 pb-4 pt-7">
      <SpotifyPlayer
        token={token}
        showSaveIcon
        uris={["spotify:track:0xZ0x5j9Vw1l6j4E3Bb6Z3"]}
        styles={{
          bgColor: "oklch(21.1484% .01165 254.088 / 1)",
          color: "#fff",
          trackNameColor: "#fff",
          trackArtistColor: "#b3b3b3",
          sliderColor: "#1db954",
          sliderHandleColor: "#1db954",
          sliderTrackColor: "#535353",
        }}
      />
      <div className="divider flex md:hidden"></div>
      {/* For mobile device */}
      <div className="mt-4 flex items-center justify-between md:hidden">
        <div data-tip="Home" className="tooltip tooltip-top">
          <Link href="/himig/home" className="btn btn-circle">
            <FaHome size={20} />
          </Link>
        </div>
        <div data-tip="Search" className="tooltip tooltip-top">
          <Link href="/himig/home" className="btn btn-circle">
            <FaSearch size={20} />
          </Link>
        </div>
        <div data-tip="Your Library" className="tooltip tooltip-top">
          <Link href="/himig/home" className="btn btn-circle">
            <IoLibrary size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
