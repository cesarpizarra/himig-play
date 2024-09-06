"use client";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
export default function Header() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push("/");
  };
  return (
    <header className="sticky top-0 z-50 bg-dark">
      <nav className="navbar py-4">
        <div className="navbar-start">
          <Link href="/himig/home" className="justify-between">
            <Image src="/logo.png" width={50} height={50} alt="logo" />
          </Link>

          <div className="ml-5 flex items-center gap-3">
            <span
              className="tooltip tooltip-bottom cursor-pointer"
              data-tip="Go back"
            >
              <MdArrowBackIos size={25} />
            </span>
            <span
              className="tooltip tooltip-bottom cursor-pointer"
              data-tip="Go forward"
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
              className="w-96 grow text-sm"
              placeholder="What do you want to play?"
            />
          </label>
        </div>
        <div className="navbar-end">
          <div data-tip="What's New?" className="tooltip tooltip-bottom">
            <button className="btn btn-circle mr-5 text-white">
              <IoIosNotifications size={25} />
              <span className="badge badge-secondary absolute -left-9 top-5 text-white">
                New
              </span>
            </button>
          </div>
          <div className="dropdown dropdown-end">
            <button
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost bg-primary"
            >
              {status === "loading" ? (
                <span className="loading loading-spinner loading-xs"></span>
              ) : (
                <h1 className="text-xl uppercase text-white">
                  {session?.user?.name?.substring(0, 1)}
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
                <a>Settings</a>
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
