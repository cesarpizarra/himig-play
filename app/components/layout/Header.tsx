"use client";
import { useSearchContext } from "@/app/context/SearchContext";
import { useProfile } from "@/app/hooks/useProfile";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaGithub, FaHome, FaSearch } from "react-icons/fa";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
export default function Header() {
  const { data, isLoading } = useProfile();
  const { setSearchQuery, searchQuery } = useSearchContext();
  const router = useRouter();
  const pathName = usePathname();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };

  // Clear search input on route change
  useEffect(() => {
    setSearchQuery("");
  }, [pathName, setSearchQuery]);
  return (
    <header className="sticky top-0 z-50 bg-dark">
      <nav className="navbar py-4">
        <div className="navbar-start">
          <Link href="/himig/home" className="justify-between">
            <Image src="/logo.png" width={50} height={50} alt="logo" />
          </Link>

          <div className="ml-5 hidden items-center gap-3 md:flex">
            <span
              className="tooltip tooltip-bottom cursor-pointer"
              data-tip="Go back"
              onClick={() => router.back()}
            >
              <MdArrowBackIos size={25} />
            </span>
            <span
              className="tooltip tooltip-bottom cursor-pointer"
              data-tip="Go forward"
              onClick={() => router.forward()}
            >
              <MdArrowForwardIos size={25} />
            </span>
          </div>
        </div>

        <div className="navbar-center hidden md:flex">
          <div data-tip="Home" className="tooltip tooltip-bottom">
            <Link href="/himig/home" className="btn btn-circle mr-5 text-white">
              <FaHome size={25} />
            </Link>
          </div>
          <label className="input input-bordered flex items-center gap-2">
            <FaSearch size={15} />

            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="w-96 grow text-sm"
              placeholder="What do you want to play?"
            />
          </label>
        </div>

        <div className="navbar-end">
          <Link
            href="https://github.com/cesarpizarra"
            target="_blank"
            className="mr-5 flex items-center gap-2 hover:underline"
          >
            <FaGithub size={20} className="cursor-pointer text-gray-400" />

            <span className="text-xs font-medium text-gray-400 md:text-sm">
              Made with Cezaru
            </span>
          </Link>

          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : data && data.images.length > 0 ? (
                <img
                  src={data?.images[0]?.url}
                  alt={data?.display_name}
                  className="h-32 w-32 rounded-full object-cover"
                />
              ) : (
                <h1 className="text-xl uppercase text-white">
                  {data?.display_name.substring(0, 1)}
                </h1>
              )}
            </button>
            <ul
              tabIndex={0}
              className="menu dropdown-content menu-sm z-[1] mt-3 w-52 rounded-box bg-base-100 p-2 shadow"
            >
              <li>
                <Link href="/himig/profile" className="justify-between">
                  Profile
                </Link>
              </li>
              <li>
                <Link href="/himig/settings" className="justify-between">
                  Settings
                </Link>
              </li>
              <li onClick={handleLogout} className="border-t border-gray-700">
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
