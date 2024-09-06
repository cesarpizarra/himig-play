"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

const dummyData = [
  { id: 1, name: "Liked Songs" },
  { id: 2, name: "Taylor Swift" },
  { id: 3, name: "BINI" },
  { id: 4, name: "Liked Songs" },
  { id: 5, name: "Taylor Swift" },
  { id: 6, name: "BINI" },
  { id: 7, name: "BINI" },
  { id: 8, name: "BINI" },
];

const colors: string[] = [
  "#102693",
  "#3B7D0D",
  "#114C90",
  "#935511",
  "#930F27",
  "#701a75",
  "#0c4a6e",
  "#365314",
];

export default function Home() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  useEffect(() => {
    const fetchSpotifyTracks = async () => {
      try {
        const response = await axios.get("/api/spotify/me");
        console.log("Response", response);
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchSpotifyTracks();
  }, []);

  return (
    <section className="min-h-screen w-full rounded-md bg-base-200">
      <div
        style={{
          background: hoveredIndex !== null ? colors[hoveredIndex] : "#102693",
        }}
        className="relative z-0 rounded-md p-4 pb-24 transition-all duration-500 ease-in-out"
      >
        <div className="pointer-events-none absolute inset-0 z-[-1] bg-gradient-to-b from-transparent to-base-200"></div>
        <h1>Good Evening!</h1>

        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
          {dummyData.map((value, index) => (
            <div
              key={value.id}
              className="cursor-pointer rounded-md bg-gray-100 bg-opacity-10 bg-clip-padding p-4 backdrop-blur-sm backdrop-filter transition-all duration-300 hover:bg-opacity-15"
              onMouseOver={() => setHoveredIndex(index)}
            >
              {value.name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
