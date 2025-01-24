"use client";
import { useSearchContext } from "@/app/context/SearchContext";
import { useProfile } from "@/app/hooks/useProfile";
import { signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import { FaHome, FaSearch } from "react-icons/fa";
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
      <nav className="navbar gap-2 py-4">
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

        <div className="navbar-center flex-grow">
          <div
            data-tip="Home"
            className="tooltip tooltip-bottom hidden md:block"
          >
            <Link href="/himig/home" className="btn btn-circle mr-5 text-white">
              <FaHome size={25} />
            </Link>
          </div>
          <label className="relative w-full max-w-md md:max-w-lg">
            <FaSearch
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="input input-bordered w-full pl-10 text-sm sm:w-64 md:w-96"
              placeholder="What do you want to play?"
            />
          </label>
        </div>

        <div className="navbar-end">
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost"
            >
              {isLoading ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : data && data.images.length > 0 ? (
                <Image
                  src={data?.images[0]?.url}
                  alt={data?.display_name}
                  className="h-32 w-32 rounded-full object-cover"
                  width={32}
                  height={32}
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
