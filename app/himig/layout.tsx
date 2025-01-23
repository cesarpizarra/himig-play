import React from "react";
import DefaultLayout from "../components/layout";
import { SearchProvider } from "../context/SearchContext";

export default function HimigLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-dark text-white">
      <SearchProvider>
        <DefaultLayout>{children}</DefaultLayout>
      </SearchProvider>
    </div>
  );
}
