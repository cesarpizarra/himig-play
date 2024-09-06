import Image from "next/image";
import React from "react";
import {
  FaCheckCircle,
  FaStepBackward,
  FaStepForward,
  FaPauseCircle,
  FaPlayCircle,
} from "react-icons/fa";
import { IoShuffle, IoLibrary } from "react-icons/io5";
import { IoMdRepeat, IoMdVolumeHigh } from "react-icons/io";
import { PiMicrophoneStageDuotone } from "react-icons/pi";
import { FaHome, FaSearch } from "react-icons/fa";
import Link from "next/link";

export default function Play() {
  return (
    <div className="sticky bottom-0 z-50 w-full overflow-x-hidden bg-dark px-4 pb-4 pt-7">
      <div className="mb-2 flex items-center justify-between">
        <div className="flex items-center space-x-5">
          <Image
            src="/taylor.jpg"
            width={50}
            height={50}
            alt="Taylor"
            className="rounded-md"
          />
          <div className="flex flex-col">
            <h3 className="text-sm">Enchanted</h3>
            <h1 className="text-xs">Taylor Swift</h1>
          </div>
          <FaCheckCircle className="text-success" />
        </div>
        <div className="flex items-center gap-3 md:hidden">
          <span data-tip="Play" className="tooltip tooltip-top cursor-pointer">
            <FaPlayCircle size={30} />
          </span>

          <span
            data-tip="Lyrics"
            className="tooltip tooltip-top cursor-pointer"
          >
            <PiMicrophoneStageDuotone size={20} />
          </span>
        </div>
        <div className="hidden items-center gap-5 md:flex">
          <span
            data-tip="Enable Smart Shuffle"
            className="tooltip tooltip-top cursor-pointer"
          >
            <IoShuffle size={20} />
          </span>
          <span
            data-tip="Previous"
            className="tooltip tooltip-top cursor-pointer"
          >
            <FaStepBackward size={20} />
          </span>
          <span data-tip="Play" className="tooltip tooltip-top cursor-pointer">
            <FaPlayCircle size={30} />
          </span>
          <span data-tip="Next" className="tooltip tooltip-top cursor-pointer">
            <FaStepForward size={20} />
          </span>
          <span
            data-tip="Enable Repeat"
            className="tooltip tooltip-top cursor-pointer"
          >
            <IoMdRepeat size={20} />
          </span>
        </div>

        <div className="hidden items-center gap-5 md:flex">
          <span
            data-tip="Lyrics"
            className="tooltip tooltip-top cursor-pointer"
          >
            <PiMicrophoneStageDuotone size={20} />
          </span>
          <span data-tip="Mute" className="tooltip tooltip-top cursor-pointer">
            <IoMdVolumeHigh size={20} />
          </span>
        </div>
      </div>
      <div className="divider"></div>
      <div className="mt-4 flex items-center justify-between md:hidden">
        <div data-tip="Home" className="tooltip tooltip-top">
          <Link href="/himig/home" className="btn btn-circle">
            <FaHome size={20} />
          </Link>
        </div>
        <div data-tip="Search" className="tooltip tooltip-top">
          <Link href="/himig/home" className="btn btn-circle">
            <FaSearch size={20} />
          </Link>
        </div>
        <div data-tip="Your Library" className="tooltip tooltip-top">
          <Link href="/himig/home" className="btn btn-circle">
            <IoLibrary size={20} />
          </Link>
        </div>
      </div>
    </div>
  );
}
