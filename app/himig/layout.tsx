import React from "react";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import Play from "../components/sections/Play";

export default function HimigLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-dark text-white">
      <Header />
      <div className="flex gap-0 px-4 lg:gap-2">
        <Sidebar />
        {children}
      </div>
      <Play />
    </div>
  );
}
