import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import Play from "../sections/Play";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <div className="flex h-screen gap-0 px-4 lg:gap-2">
        <div className="hidden w-full max-w-sm lg:block">
          <Sidebar />
        </div>
        <div className="h-full flex-1 overflow-hidden overflow-y-auto bg-base-300">
          {children}
        </div>
        <div className="hidden w-full max-w-sm lg:block">
          <Rightbar />
        </div>
      </div>
      <Play />
    </>
  );
}
