import React from "react";
import DefaultLayout from "../components/layout";

export default function HimigLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen w-full bg-dark text-white">
      <DefaultLayout>{children}</DefaultLayout>
    </div>
  );
}
