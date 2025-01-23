"use client";
import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import Rightbar from "./Rightbar";
import Play from "../sections/Play";
import { useDebounce } from "use-debounce";
import { useSearchContext } from "@/app/context/SearchContext";
import { useSearch } from "@/app/hooks/useSpotify";
import Loading from "../common/Loading";
import SearchData from "../data/SearchData";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { searchQuery } = useSearchContext();
  const [value] = useDebounce(searchQuery, 1000);
  const { data: searchResults, isLoading: searchLoading } = useSearch(value);

  return (
    <div className="flex h-screen flex-col p-2">
      {/* Header */}
      <Header />

      {/* Main Content Section */}
      <div className="flex flex-1 gap-3 overflow-hidden">
        {/* Sidebar */}
        <div className="hidden w-1/4 max-w-xs overflow-y-auto lg:block">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="custom-scrollbar flex-1 overflow-y-auto bg-base-300">
          {searchLoading ? (
            <Loading />
          ) : searchResults && searchResults ? (
            <SearchData searchResults={searchResults} />
          ) : (
            children
          )}
        </div>

        {/* Rightbar */}
        <div className="hidden w-1/4 max-w-xs overflow-y-auto lg:block">
          <Rightbar />
        </div>
      </div>

      {/* Playbar */}
      <div className="border-t border-gray-700 bg-gray-900">
        <Play />
      </div>
    </div>
  );
}
