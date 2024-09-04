import React from "react";

const dummyData = [
  {
    id: 1,
    name: "Liked Songs",
  },
  {
    id: 2,
    name: "Taylor Swift",
  },
  {
    id: 3,
    name: "BINI",
  },
  {
    id: 4,
    name: "Liked Songs",
  },
  {
    id: 5,
    name: "Taylor Swift",
  },
  {
    id: 6,
    name: "BINI",
  },
];

export default function Home() {
  return (
    <section className="bg-base-200 min-h-screen w-full rounded-md p-4">
      <h1>Good Evening!</h1>

      <div className="mt-4 grid grid-cols-2 gap-3">
        {dummyData.map((value) => (
          <div key={value.id} className="bg-base-300 rounded-md p-4">
            {value.name}
          </div>
        ))}
      </div>
    </section>
  );
}
