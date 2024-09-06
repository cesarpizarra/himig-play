import React from "react";
import { IoLibrary } from "react-icons/io5";
import { FaArrowRight } from "react-icons/fa6";
export default function Sidebar() {
  return (
    <div>
      <div className="hidden min-h-screen w-80 rounded-md bg-base-300 p-4 lg:block">
        <div className="flex items-center justify-between px-6 pb-4 text-gray-400">
          <div className="flex items-center gap-4 text-white">
            <IoLibrary size={25} />
            <h1>Your Library</h1>
          </div>
          <span
            data-tip="Show more"
            className="tooltip tooltip-right cursor-pointer text-gray-400 hover:text-white"
          >
            <FaArrowRight size={20} />
          </span>
        </div>
        <ul className="menu text-base-content">
          <li>
            <a>Sidebar Item 1</a>
          </li>
          <li>
            <a>Sidebar Item 2</a>
          </li>
          <li>
            <a>Sidebar Item 3</a>
          </li>
        </ul>
      </div>
    </div>
  );
}
