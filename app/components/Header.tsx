import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaHome, FaSearch } from "react-icons/fa";
import { IoIosNotifications } from "react-icons/io";
import { MdArrowBackIos, MdArrowForwardIos } from "react-icons/md";
export default function Header() {
  return (
    <header>
      <nav className="navbar py-4">
        <div className="navbar-start">
          <a href="#">
            <Image src="/logo.png" width={50} height={50} alt="logo" />
          </a>

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
            <div className="btn btn-circle mr-5 text-white">
              <IoIosNotifications size={25} />
            </div>
          </div>
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="avatar btn btn-circle btn-ghost bg-primary"
            >
              <h1 className="text-xl uppercase text-white">C</h1>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow"
            >
              <li>
                <a className="justify-between">
                  Profile
                  <span className="badge">New</span>
                </a>
              </li>
              <li>
                <a>Settings</a>
              </li>
              <li>
                <a>Logout</a>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </header>
  );
}
