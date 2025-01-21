import Link from "next/link";
import React from "react";
import { LuExternalLink } from "react-icons/lu";

export default function Settings() {
  return (
    <div className="min-h-screen rounded-md p-4">
      <h1 className="text-2xl font-bold md:text-4xl">Settings</h1>
      <div className="mt-4">
        <h2>Account Settings</h2>
        <ul>
          <li className="flex items-center justify-between py-2">
            <span className="text-xs text-gray-400">Edit login methods</span>
            <Link
              href="https://www.spotify.com/de-en/account/login-methods/"
              className="inline-flex cursor-pointer items-center gap-2 hover:underline"
            >
              <span>Edit</span> <LuExternalLink size={18} />
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
}
